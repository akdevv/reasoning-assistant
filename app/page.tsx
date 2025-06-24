"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInput } from "@/components/chat-input";
import { ChatBubble } from "@/components/chat-bubble";
import { WelcomeScreen } from "@/components/welcome-screen";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	model?: string;
	useThinking?: boolean;
}

let messageIdCounter = 0;

export default function Home() {
	const [input, setInput] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [thinkingMode, setThinkingMode] = useState(true);
	const [selectedModel, setSelectedModel] = useState("deepseek-r1");
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const generateUniqueId = () => {
		messageIdCounter += 1;
		return `msg_${Date.now()}_${messageIdCounter}_${Math.random()
			.toString(36)
			.substr(2, 9)}`;
	};

	const scrollToBottom = useCallback(
		(smooth = true) => {
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
			}

			scrollTimeoutRef.current = setTimeout(
				() => {
					// Find the scroll viewport within the ScrollArea
					const scrollContainer = scrollContainerRef.current;
					if (scrollContainer) {
						const viewport = scrollContainer.querySelector(
							'[data-slot="scroll-area-viewport"]'
						) as HTMLElement;
						if (viewport) {
							requestAnimationFrame(() => {
								viewport.scrollTo({
									top: viewport.scrollHeight,
									behavior: smooth ? "smooth" : "auto",
								});
							});
						}
					}
				},
				isLoading ? 20 : 50
			); // Very fast during streaming, moderate when idle
		},
		[isLoading]
	);

	const handleExampleSelect = (question: string) => {
		setInput(question);
	};

	const sendMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const userMessageContent = input.trim();

		const userMessage: Message = {
			id: generateUniqueId(),
			role: "user",
			content: userMessageContent,
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		const assistantMessage: Message = {
			id: generateUniqueId(),
			role: "assistant",
			content: "",
			model: selectedModel,
			useThinking: thinkingMode,
		};

		setMessages((prev) => [...prev, assistantMessage]);

		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: userMessageContent,
					model: selectedModel,
					useThinking: thinkingMode,
				}),
			});

			const reader = res.body?.getReader();
			if (!reader) {
				throw new Error("Failed to get reader");
			}

			let accumulatedContent = "";
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = new TextDecoder().decode(value);
				const lines = chunk.split("\n");

				for (const line of lines) {
					if (line.startsWith("data: ")) {
						const data = line.slice(6);
						if (data === "[DONE]") continue;

						try {
							const parsed = JSON.parse(data);
							if (parsed.content) {
								accumulatedContent += parsed.content;
								setMessages((prev) =>
									prev.map((msg) =>
										msg.id === assistantMessage.id &&
										msg.role === "assistant"
											? {
													...msg,
													content: accumulatedContent,
											  }
											: msg
									)
								);
							}
						} catch (error) {
							console.error("Error parsing JSON:", error);
						}
					}
				}
			}
		} catch (error) {
			console.error(error);
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === assistantMessage.id && msg.role === "assistant"
						? { ...msg, content: "Error: " + error }
						: msg
				)
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		scrollToBottom(!isLoading);
	}, [messages, isLoading, scrollToBottom]);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
			}
		};
	}, []);

	return (
		<div className="flex flex-col h-screen">
			{/* Messages */}
			<div className="overflow-hidden">
				<ScrollArea className="h-full" ref={scrollContainerRef}>
					<div className="max-w-3xl mx-auto px-2 py-6 pb-48">
						{messages.length === 0 ? (
							<WelcomeScreen
								onSelectExample={handleExampleSelect}
							/>
						) : (
							<div className="space-y-6">
								{messages.map((message, index) => (
									<ChatBubble
										key={message.id}
										message={message}
										isLoading={isLoading}
										isLastMessage={
											index === messages.length - 1
										}
										messageIndex={index}
									/>
								))}
								<div ref={messagesEndRef} />
							</div>
						)}
					</div>
				</ScrollArea>
			</div>

			{/* Chat Input */}
			<ChatInput
				input={input}
				setInput={setInput}
				isLoading={isLoading}
				selectedModel={selectedModel}
				setSelectedModel={setSelectedModel}
				thinkingMode={thinkingMode}
				setThinkingMode={setThinkingMode}
				onSendMessage={sendMessage}
			/>
		</div>
	);
}
