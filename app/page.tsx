"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInput } from "@/components/chat-input";
import { ChatBubble } from "@/components/chat-bubble";
import { Bot } from "lucide-react";

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
	const [thinkingMode, setThinkingMode] = useState(false);
	const [selectedModel, setSelectedModel] = useState("llama-70b");

	const generateUniqueId = () => {
		messageIdCounter += 1;
		return `msg_${Date.now()}_${messageIdCounter}_${Math.random()
			.toString(36)
			.substr(2, 9)}`;
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
		console.log("messages =>", messages);
	}, [messages]);

	return (
		<div className="flex flex-col h-screen">
			{/* Messages */}
			<div className="overflow-hidden">
				<ScrollArea className="h-full">
					<div className="max-w-3xl mx-auto px-2 py-6 pb-48">
						{messages.length === 0 ? (
							<div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
								<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
									<Bot className="w-8 h-8 text-primary" />
								</div>
								<h2 className="text-2xl font-semibold text-foreground mb-2">
									Welcome to AI Assistant
								</h2>
								<p className="text-muted-foreground max-w-md">
									Ask me anything! I can help with coding,
									math, science, or just have a conversation.
								</p>
							</div>
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
