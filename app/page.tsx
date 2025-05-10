import {
	FaBrain,
	FaPuzzlePiece,
	FaProjectDiagram,
	FaTwitter,
	FaLinkedin,
	FaGithub,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineArrowOutward } from "react-icons/md";
import { PiGitBranchLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen bg-background text-foreground max-w-7xl mx-auto">
			{/* Header */}
			<header className="flex justify-between items-center py-6 px-4 md:px-12 bg-background">
				<div className="flex items-center gap-2">
					<FaBrain className="text-accent-yellow text-2xl" />
					<span className="font-bold text-xl">
						Reasoning Assistant
					</span>
				</div>
				<div className="hidden md:flex gap-2">
					<Button
						asChild
						className="bg-accent-blue hover:bg-accent-blue/90 text-black font-medium px-4 py-2 text-sm md:text-base transition-all duration-300"
					>
						<Link href="/login">Login</Link>
					</Button>
					<Button
						asChild
						className="bg-accent-yellow hover:bg-accent-yellow/90 text-black font-medium px-4 py-2 text-sm md:text-base transition-all duration-300"
					>
						<Link href="/register">Register</Link>
					</Button>
				</div>
			</header>

			{/* Hero Section */}
			<section className="flex flex-col md:flex-row items-center justify-between gap-8 py-16 md:py-24 px-4 md:px-12">
				<div className="w-full md:w-1/2 space-y-6">
					<h1 className="text-3xl md:text-5xl font-bold leading-tight mb-2 font-sora">
						Enhance Your Reasoning
						<br />
						with{" "}
						<span className="text-accent-purple">
							AI-Powered Chain
							<br className="hidden md:block" /> of Thought
						</span>
					</h1>
					<p className="text-base md:text-lg text-foreground/80 max-w-xl mb-4">
						Experience a new way of problem-solving with our
						advanced Chain of Thought model that breaks down complex
						reasoning into simple, logical steps.
					</p>
					<div className="flex gap-4 mt-4">
						<Button
							asChild
							className="p-5 bg-accent-green hover:bg-accent-green/90 text-black font-semibold transition-all duration-300"
						>
							<Link href="/login">
								<div className="flex items-center gap-2">
									<span>Try Now </span>
									<MdOutlineArrowOutward className="font-bold" />
								</div>
							</Link>
						</Button>
						<Button
							asChild
							className="p-5 border border-foreground/10 bg-foreground/0 hover:bg-foreground/10 text-foreground font-semibold transition-all duration-300"
						>
							<Link
								href="https://www.ibm.com/think/topics/chain-of-thoughts"
								target="_blank"
							>
								Learn More
							</Link>
						</Button>
					</div>
				</div>
				<div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
					<div className="bg-background-light rounded-2xl shadow-lg p-8 flex items-center justify-center">
						<Image
							src="/hero-image.png"
							alt="Brain Illustration"
							width={450}
							height={450}
							className="rounded-xl"
							priority
						/>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section id="works" className="py-16 px-4 md:px-12">
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-12 font-sora">
					How Chain of Thought Works
				</h2>
				<div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
					<Card className="flex-1 bg-background border border-border/40 shadow-md hover:shadow-lg transition-all duration-300">
						<CardContent className="flex flex-col items-start gap-4 py-8">
							<div className="bg-accent-purple/20 rounded-full p-4 shadow-sm">
								<FaPuzzlePiece className="text-accent-purple text-3xl" />
							</div>
							<CardTitle className="text-xl font-sora font-bold text-foreground/90">
								Problem Analysis
							</CardTitle>
							<p className="text-foreground/70 text-base">
								Our model breaks down complex problems into
								smaller, manageable components for better
								understanding.
							</p>
						</CardContent>
					</Card>
					<Card className="flex-1 bg-background border border-border/40 shadow-md hover:shadow-lg transition-all duration-300">
						<CardContent className="flex flex-col items-start gap-4 py-8">
							<div className="bg-accent-blue/20 rounded-full p-4 shadow-sm">
								<PiGitBranchLight className="text-accent-blue text-3xl" />
							</div>
							<CardTitle className="text-xl font-sora font-bold text-foreground/90">
								Logical Processing
							</CardTitle>
							<p className="text-foreground/70 text-base">
								Step-by-step reasoning process that mimics human
								thought patterns for optimal solutions.
							</p>
						</CardContent>
					</Card>
					<Card className="flex-1 bg-background border border-border/40 shadow-md hover:shadow-lg transition-all duration-300">
						<CardContent className="flex flex-col items-start gap-4 py-8">
							<div className="bg-accent-yellow/20 rounded-full p-4 shadow-sm">
								<FaProjectDiagram className="text-accent-yellow text-3xl" />
							</div>
							<CardTitle className="text-xl font-sora font-bold text-foreground/90">
								Result Synthesis
							</CardTitle>
							<p className="text-foreground/70 text-base">
								Combines intermediate steps to provide
								comprehensive and well-reasoned conclusions.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* See It in Action Section */}
			<section className="bg-background py-16 px-4 md:px-0 flex justify-center">
				<div className="bg-background-light rounded-2xl shadow-lg max-w-3xl w-full mx-auto p-5 md:p-10 flex flex-col items-center border border-border/30">
					<h2 className="text-2xl md:text-3xl font-bold text-center mb-2 font-sora">
						See It in Action
					</h2>
					<p className="text-center text-foreground/70 mb-8 max-w-xl">
						Watch how our Chain of Thought model processes complex
						reasoning tasks in real-time.
					</p>
					<div className="w-full bg-black rounded-xl p-5 md:p-8 flex flex-col gap-8 shadow-inner">
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-4">
								<span className="bg-accent-yellow text-black font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-md">
									1
								</span>
								<span className="text-foreground/90 font-semibold">
									Input
								</span>
							</div>
							<div className="ml-14">
								<span className="text-foreground/80">
									What is the environmental impact of electric
									vehicles?
								</span>
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-4">
								<span className="bg-accent-green text-black font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-md">
									2
								</span>
								<span className="text-foreground/90 font-semibold">
									Processing
								</span>
							</div>
							<div className="ml-14">
								<span className="text-foreground/80">
									Analyzing manufacturing impact, energy
									sources, battery disposal...
								</span>
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-4">
								<span className="bg-accent-purple text-black font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-md">
									3
								</span>
								<span className="text-foreground/90 font-semibold">
									Output
								</span>
							</div>
							<div className="ml-14">
								<span className="text-foreground/80">
									Comprehensive analysis of environmental
									benefits and challenges...
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action Section */}
			<section className="bg-gradient-to-br from-background-light to-background py-24 px-4 md:px-0 flex flex-col items-center text-center rounded-lg mx-4 my-12 shadow-lg">
				<h2 className="text-3xl md:text-4xl font-bold mb-6 font-sora">
					Ready to Enhance Your Reasoning?
				</h2>
				<p className="text-foreground/70 mb-10 max-w-xl mx-auto text-lg">
					Join thousands of users who are already benefiting from our
					Chain of Thought model.
				</p>
				<Button
					asChild
					className="bg-accent-yellow hover:bg-accent-yellow-hover text-black font-semibold rounded-md px-10 py-6 text-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<Link href="/register">Get Started Free</Link>
				</Button>
			</section>

			{/* Footer */}
			<footer className="bg-background text-foreground py-12 px-4 mt-8 border-t border-border/30">
				<div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
					<div className="flex items-center gap-2">
						<FaBrain className="text-accent-yellow text-2xl" />
						<span className="font-bold text-xl">
							Reasoning Assistant
						</span>
					</div>

					<div className="flex gap-6 mt-4">
						<a
							href="#"
							aria-label="Twitter"
							className="text-foreground/70 hover:text-accent-blue transition-colors"
						>
							<FaTwitter size={24} />
						</a>
						<a
							href="#"
							aria-label="LinkedIn"
							className="text-foreground/70 hover:text-accent-blue transition-colors"
						>
							<FaLinkedin size={24} />
						</a>
						<a
							href="#"
							aria-label="GitHub"
							className="text-foreground/70 hover:text-accent-blue transition-colors"
						>
							<FaGithub size={24} />
						</a>
					</div>

					<div className="text-center text-foreground/60 text-sm mt-6">
						© {new Date().getFullYear()} Reasoning Assistant. All
						rights reserved.
					</div>
				</div>
			</footer>
		</div>
	);
}
