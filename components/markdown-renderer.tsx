// components/markdown-renderer.tsx
"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { ComponentPropsWithoutRef } from "react";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

// Import KaTeX CSS
import "katex/dist/katex.min.css";

interface MarkdownRendererProps {
	content: string;
	className?: string;
}

// Language detection helper
const detectLanguage = (className?: string): string => {
	if (!className) return "";
	const match = className.match(/language-(\w+)/);
	return match ? match[1] : "";
};

// Language display names
const languageNames: Record<string, string> = {
	js: "JavaScript",
	jsx: "JSX",
	ts: "TypeScript",
	tsx: "TSX",
	py: "Python",
	python: "Python",
	java: "Java",
	cpp: "C++",
	c: "C",
	cs: "C#",
	php: "PHP",
	rb: "Ruby",
	go: "Go",
	rs: "Rust",
	kt: "Kotlin",
	swift: "Swift",
	dart: "Dart",
	scala: "Scala",
	r: "R",
	sql: "SQL",
	html: "HTML",
	css: "CSS",
	scss: "SCSS",
	sass: "Sass",
	less: "Less",
	xml: "XML",
	json: "JSON",
	yaml: "YAML",
	yml: "YAML",
	toml: "TOML",
	ini: "INI",
	bash: "Bash",
	sh: "Shell",
	zsh: "Zsh",
	fish: "Fish",
	powershell: "PowerShell",
	ps1: "PowerShell",
	dockerfile: "Dockerfile",
	docker: "Docker",
	makefile: "Makefile",
	make: "Make",
	cmake: "CMake",
	vim: "Vim",
	lua: "Lua",
	perl: "Perl",
	haskell: "Haskell",
	clojure: "Clojure",
	elixir: "Elixir",
	erlang: "Erlang",
	ocaml: "OCaml",
	fsharp: "F#",
	markdown: "Markdown",
	md: "Markdown",
	tex: "LaTeX",
	latex: "LaTeX",
	diff: "Diff",
	patch: "Patch",
};

function CodeBlock({
	children,
	className,
	...props
}: ComponentPropsWithoutRef<"pre"> & { children: React.ReactNode }) {
	const [copied, setCopied] = useState(false);
	const language = detectLanguage(className);
	const displayName = languageNames[language.toLowerCase()] || language;

	// Extract text content for copying
	const getTextContent = (node: React.ReactNode): string => {
		if (typeof node === "string") return node;
		if (typeof node === "number") return node.toString();
		if (Array.isArray(node)) return node.map(getTextContent).join("");
		if (node && typeof node === "object" && "props" in node) {
			const element = node as any;
			return getTextContent(element.props?.children);
		}
		return "";
	};

	const codeText = getTextContent(children);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(codeText);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	return (
		<div className="relative group my-4 sm:my-6 rounded-xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg max-w-full">
			{/* Header with language and copy button */}
			<div className="flex items-center justify-between bg-muted/80 backdrop-blur-sm text-muted-foreground px-3 py-2 sm:px-4 sm:py-3 border-b border-border/30">
				<div className="flex items-center gap-2 min-w-0 flex-1">
					<span className="text-xs sm:text-sm font-medium ml-1 sm:ml-2 text-foreground/90 truncate">
						{displayName || "Code"}
					</span>
				</div>
				<button
					onClick={copyToClipboard}
					className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 text-xs bg-background/80 hover:bg-background border border-border/50 rounded-lg transition-all duration-200 hover:shadow-md font-medium text-foreground/80 hover:text-foreground flex-shrink-0"
				>
					{copied ? (
						<>
							<Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
							<span className="hidden sm:inline">Copied!</span>
						</>
					) : (
						<>
							<Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
							<span className="hidden sm:inline">Copy</span>
						</>
					)}
				</button>
			</div>

			{/* Code content */}
			<div className="relative overflow-hidden">
				<pre
					{...props}
					className="bg-card/90 text-foreground p-3 sm:p-4 lg:p-5 overflow-x-auto leading-relaxed max-w-full"
					style={{
						fontSize: "12px",
						lineHeight: "1.5",
						fontFamily:
							'var(--font-mono), Monaco, Menlo, "Ubuntu Mono", Consolas, monospace',
						...(window.innerWidth >= 640 && {
							fontSize: "14px",
							lineHeight: "1.6",
						}),
					}}
				>
					{children}
				</pre>

				{/* Subtle gradient overlay for depth */}
				<div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/5 pointer-events-none"></div>
			</div>
		</div>
	);
}

export function MarkdownRenderer({
	content,
	className = "",
}: MarkdownRendererProps) {
	return (
		<div
			className={`prose prose-sm dark:prose-invert max-w-none overflow-hidden ${className}`}
		>
			<ReactMarkdown
				remarkPlugins={[remarkGfm, remarkMath]}
				rehypePlugins={[rehypeKatex, rehypeHighlight]}
				components={{
					// Enhanced code block styling with language detection
					pre: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"pre">) => {
						// Check if this is a code block (has a code child with className)
						const codeChild = Array.isArray(children)
							? children.find(
									(child: any) =>
										child?.type === "code" ||
										(child?.props && child.props.className)
							  )
							: children;

						if (
							codeChild &&
							typeof codeChild === "object" &&
							"props" in codeChild
						) {
							return (
								<CodeBlock
									className={codeChild.props.className}
									{...props}
								>
									{children}
								</CodeBlock>
							);
						}

						return <CodeBlock {...props}>{children}</CodeBlock>;
					},

					// Inline code styling
					code: ({
						inline,
						children,
						...props
					}: ComponentPropsWithoutRef<"code"> & {
						inline?: boolean;
					}) => {
						if (inline) {
							return (
								<code
									{...props}
									className="bg-muted/60 text-foreground px-1.5 py-0.5 sm:px-2 rounded-md text-xs sm:text-sm font-mono border border-border/30 font-medium break-all"
								>
									{children}
								</code>
							);
						}
						return (
							<code
								{...props}
								className="text-foreground font-mono break-all"
							>
								{children}
							</code>
						);
					},

					// Table styling
					table: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"table">) => (
						<div className="overflow-x-auto my-4 sm:my-6 rounded-lg border border-border/50 bg-card/50 max-w-full">
							<table
								{...props}
								className="min-w-full border-collapse text-sm"
							>
								{children}
							</table>
						</div>
					),

					th: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"th">) => (
						<th
							{...props}
							className="border-b border-border/50 bg-muted/50 px-2 py-2 sm:px-4 sm:py-3 text-left font-semibold text-foreground text-xs sm:text-sm"
						>
							{children}
						</th>
					),

					td: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"td">) => (
						<td
							{...props}
							className="border-b border-border/30 px-2 py-2 sm:px-4 sm:py-3 text-muted-foreground text-xs sm:text-sm"
						>
							{children}
						</td>
					),

					// Blockquote styling
					blockquote: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"blockquote">) => (
						<blockquote
							{...props}
							className="border-l-4 border-primary/60 pl-6 py-3 my-6 bg-muted/30 italic text-muted-foreground rounded-r-lg"
						>
							{children}
						</blockquote>
					),

					// Heading styling
					h1: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"h1">) => (
						<h1
							{...props}
							className="text-2xl font-bold mt-8 mb-4 text-foreground border-b border-border/30 pb-2"
						>
							{children}
						</h1>
					),

					h2: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"h2">) => (
						<h2
							{...props}
							className="text-xl font-bold mt-6 mb-3 text-foreground"
						>
							{children}
						</h2>
					),

					h3: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"h3">) => (
						<h3
							{...props}
							className="text-lg font-semibold mt-5 mb-2 text-foreground"
						>
							{children}
						</h3>
					),

					// List styling
					ul: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"ul">) => (
						<ul
							{...props}
							className="list-disc pl-6 my-4 space-y-2 text-muted-foreground"
						>
							{children}
						</ul>
					),

					ol: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"ol">) => (
						<ol
							{...props}
							className="list-decimal pl-6 my-4 space-y-2 text-muted-foreground"
						>
							{children}
						</ol>
					),

					li: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"li">) => (
						<li
							{...props}
							className="text-muted-foreground leading-relaxed"
						>
							{children}
						</li>
					),

					// Paragraph styling
					p: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"p">) => (
						<p
							{...props}
							className="mb-4 text-muted-foreground leading-relaxed"
						>
							{children}
						</p>
					),

					// Strong/Bold styling
					strong: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"strong">) => (
						<strong
							{...props}
							className="font-bold text-foreground"
						>
							{children}
						</strong>
					),

					// Emphasis/Italic styling
					em: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"em">) => (
						<em {...props} className="italic text-foreground/90">
							{children}
						</em>
					),

					// Link styling
					a: ({
						children,
						...props
					}: ComponentPropsWithoutRef<"a">) => (
						<a
							{...props}
							className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors font-medium"
							target="_blank"
							rel="noopener noreferrer"
						>
							{children}
						</a>
					),

					// Horizontal rule
					hr: ({ ...props }: ComponentPropsWithoutRef<"hr">) => (
						<hr {...props} className="my-8 border-border/50" />
					),
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
