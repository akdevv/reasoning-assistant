"use client";

import { Bot } from "lucide-react";

interface WelcomeScreenProps {
	onSelectExample: (question: string) => void;
}

const exampleQuestions = [
	{
		id: 1,
		question: "Explain quantum computing in simple terms",
		icon: "🔬",
	},
	{
		id: 2,
		question: "Help me debug this JavaScript function",
		icon: "💻",
	},
	{
		id: 3,
		question: "Create a creative story about time travel",
		icon: "✨",
	},
];

export function WelcomeScreen({ onSelectExample }: WelcomeScreenProps) {
	return (
		<div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4">
			{/* Header */}
			<div className="mb-12">
				<div className="relative mb-8 mx-auto flex justify-center">
					{/* Main logo container */}
					<div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/10 backdrop-blur-sm">
						<Bot className="w-12 h-12 text-primary drop-shadow-sm" />
					</div>
				</div>
				<h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
					Welcome to Thinking AI Assistant
				</h1>
				<p className="text-muted-foreground/80 text-lg max-w-lg mx-auto leading-relaxed">
					I'm here to help with anything you need. Ask me questions,
					get help with coding, or just have a conversation.
				</p>
			</div>

			{/* Example Questions */}
			<div className="w-full max-w-2xl">
				<div className="text-sm font-semibold text-muted-foreground/90 mb-6 text-left">
					Try asking me:
				</div>
				<div className="space-y-4">
					{exampleQuestions.map((example, index) => (
						<button
							key={example.id}
							onClick={() => onSelectExample(example.question)}
							className="w-full group relative bg-gradient-to-r from-muted/40 to-muted/30 hover:from-muted/60 hover:to-muted/50 border border-border/40 hover:border-primary/30 rounded-2xl p-5 text-left transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
							style={{
								animationDelay: `${index * 100}ms`,
							}}
						>
							<div className="flex items-center gap-4">
								<div className="text-2xl transition-transform duration-300 ease-out">
									{example.icon}
								</div>
								<div className="flex-1">
									<p className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-300">
										{example.question}
									</p>
								</div>
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Footer */}
			<div className="mt-10 text-sm text-muted-foreground/60 font-medium">
				<span className="relative">
					You can also type your own question below
					<div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent"></div>
				</span>
			</div>
		</div>
	);
}
