"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import ModelSelector from "@/components/model-selector";
import { FaArrowUpLong } from "react-icons/fa6";

interface ChatInputProps {
	input: string;
	setInput: (value: string) => void;
	isLoading: boolean;
	selectedModel: string;
	setSelectedModel: (value: string) => void;
	thinkingMode: boolean;
	setThinkingMode: (value: boolean) => void;
	onSendMessage: (e: React.FormEvent) => void;
}

export function ChatInput({
	input,
	setInput,
	isLoading,
	selectedModel,
	setSelectedModel,
	thinkingMode,
	setThinkingMode,
	onSendMessage,
}: ChatInputProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Auto-resize textarea
	useEffect(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
		}
	}, [input]);

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 bg-background max-w-3xl mx-auto">
			<div className="p-3">
				<div>
					{/* Outer container with gradient background */}
					<div className="p-2 rounded-lg relative overflow-hidden border border-border/30 shadow-lg bg-card/10 backdrop-blur-md group">
						{/* Gradient background elements */}
						<div className="absolute inset-0 z-0 transition-all duration-500">
							<div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-20"></div>
							<div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl group-hover:bg-primary/30 group-hover:translate-x-3 group-hover:-translate-y-3 transition-all duration-700"></div>
							<div className="absolute -bottom-32 -right-16 w-80 h-80 bg-accent/15 rounded-full filter blur-3xl group-hover:bg-accent/25 group-hover:-translate-x-3 group-hover:translate-y-3 transition-all duration-700"></div>
							<div className="absolute top-1/2 right-1/4 w-64 h-64 bg-destructive/10 rounded-full filter blur-3xl group-hover:bg-destructive/15 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-700"></div>
						</div>

						{/* Content container */}
						<div className="relative z-10 bg-card/40 backdrop-blur-sm rounded-md border border-border/50">
							<form
								onSubmit={onSendMessage}
								className="p-2 sm:p-3"
							>
								{/* Input section */}
								<div className="mb-3">
									<textarea
										ref={textareaRef}
										value={input}
										onChange={(e) =>
											setInput(e.target.value)
										}
										placeholder="Ask anything..."
										rows={1}
										className="w-full min-h-[44px] sm:min-h-[48px] max-h-[120px] px-3 py-3 resize-none border-0 bg-transparent focus:outline-none focus:ring-0 text-sm sm:text-base text-foreground placeholder:text-muted-foreground overflow-y-auto"
										style={{ resize: "none" }}
										onKeyDown={(e) => {
											if (
												e.key === "Enter" &&
												!e.shiftKey
											) {
												e.preventDefault();
												onSendMessage(e);
											}
										}}
									/>
								</div>

								{/* Controls section */}
								<div className="flex items-start sm:items-center justify-between gap-3 pt-2 border-t border-border/30">
									{/* Left controls */}
									<div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
										<div className="flex items-center gap-2">
											<ModelSelector
												value={selectedModel}
												onValueChange={setSelectedModel}
											/>
										</div>

										<div className="flex items-center gap-2">
											<Switch
												id="thinking-mode"
												checked={thinkingMode}
												onCheckedChange={
													setThinkingMode
												}
												className="scale-75 sm:scale-100 cursor-pointer"
											/>
											<label
												htmlFor="thinking-mode"
												className="cursor-pointer select-none font-medium"
											>
												Thinking Mode
											</label>
										</div>
									</div>

									{/* Send button */}
									<Button
										type="submit"
										size="sm"
										disabled={!input.trim() || isLoading}
										className="h-8 w-8 p-0 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
									>
										<FaArrowUpLong className="h-3.5 w-3.5" />
										<span className="sr-only">
											Send message
										</span>
									</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
