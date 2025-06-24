"use client";

import { useState } from "react";
import { Loader2, Brain, ChevronDown, ChevronUp } from "lucide-react";
import { MODELS_LABELS } from "@/constants";
import { MarkdownRenderer } from "@/components/markdown-renderer";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	model?: string;
	useThinking?: boolean;
}

interface ChatBubbleProps {
	message: Message;
	isLoading: boolean;
	isLastMessage: boolean;
	messageIndex: number;
}

export function ChatBubble({
	message,
	isLoading,
	isLastMessage,
	messageIndex,
}: ChatBubbleProps) {
	const [isThinkingExpanded, setIsThinkingExpanded] = useState(false);

	const formatContent = (content: string) => {
		// Handle thinking blocks
		const thinkingRegex =
			/<thinking>([\s\S]*?)<\/thinking>|<think>([\s\S]*?)<\/think>/g;
		const parts = [];
		let lastIndex = 0;
		let match;

		while ((match = thinkingRegex.exec(content)) !== null) {
			// Add content before thinking block
			if (match.index > lastIndex) {
				parts.push({
					type: "normal",
					content: content.slice(lastIndex, match.index),
				});
			}

			// Add thinking block - check which group matched
			const thinkingContent = match[1] || match[2];
			parts.push({
				type: "thinking",
				content: thinkingContent.trim(),
			});

			lastIndex = match.index + match[0].length;
		}

		// Add remaining content
		if (lastIndex < content.length) {
			parts.push({
				type: "normal",
				content: content.slice(lastIndex),
			});
		}

		return parts.length > 0 ? parts : [{ type: "normal", content }];
	};

	return (
		<div
			className={`flex animate-in slide-in-from-bottom-2 duration-500 ${
				message.role === "user" ? "justify-end" : "justify-start"
			}`}
			style={{
				animationDelay: `${messageIndex * 100}ms`,
			}}
		>
			{/* Message Content */}
			<div
				className={`group relative ${
					message.role === "user"
						? "max-w-[85%] sm:max-w-[80%] lg:max-w-[70%] bg-primary/10 text-primary-foreground/90 border border-primary/50 shadow-lg"
						: "max-w-full"
				} rounded-2xl ${
					message.role === "user" ? "rounded-tr-md" : "rounded-tl-md"
				} p-4 sm:p-5`}
			>
				{message.role === "assistant" ? (
					<div className="space-y-3">
						{/* Model info */}
						{message.model && (
							<div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground/80 pb-2 border-b border-border/50">
								<span className="font-medium">
									{
										MODELS_LABELS.find(
											(m) => m.value === message.model
										)?.label
									}
								</span>
								{message.useThinking && (
									<div className="flex items-center gap-1">
										<div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse" />
										<span className="text-muted-foreground font-medium">
											Thinking Mode
										</span>
									</div>
								)}
							</div>
						)}

						{/* Content */}
						<div className="space-y-4">
							{formatContent(message.content).map(
								(part, partIndex) => (
									<div key={partIndex}>
										{part.type === "thinking" ? (
											<div className="relative bg-muted/50 border border-border/50 rounded-lg mb-4">
												<button
													onClick={() =>
														setIsThinkingExpanded(
															!isThinkingExpanded
														)
													}
													className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-muted/70 transition-colors duration-200 rounded-lg"
												>
													<div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
														<div className="flex items-center gap-2 bg-muted px-2.5 py-1 rounded-full">
															<Brain className="w-3.5 h-3.5" />
															<span>
																Thinking Process
															</span>
														</div>
													</div>
													{isThinkingExpanded ? (
														<ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
													) : (
														<ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
													)}
												</button>
												{isThinkingExpanded && (
													<div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
														<MarkdownRenderer
															content={
																part.content
															}
															className="text-sm sm:text-base text-muted-foreground/90 prose-sm max-w-none"
														/>
													</div>
												)}
											</div>
										) : (
											<MarkdownRenderer
												content={part.content}
												className="text-sm sm:text-base leading-relaxed prose max-w-none dark:prose-invert"
											/>
										)}
									</div>
								)
							)}
						</div>

						{/* Loading indicator for streaming */}
						{isLoading && isLastMessage && (
							<div className="flex items-center gap-2 text-xs text-muted-foreground mt-3 pt-3 border-t border-border/50">
								<Loader2 className="w-3 h-3 animate-spin" />
								<span>Generating response...</span>
							</div>
						)}
					</div>
				) : (
					<div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-medium">
						{message.content}
					</div>
				)}
			</div>
		</div>
	);
}
