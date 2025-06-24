# Reasoning Assistant 🤖

A modern AI-powered chat application that leverages **Chain of Thought (CoT) reasoning** to provide more thoughtful and structured responses to complex questions.

![Reasoning Assistant](/public/showcase.png)

## What is Chain of Thought in AI?

**Chain of Thought (CoT)** is an AI reasoning technique that enables language models to break down complex problems into step-by-step logical sequences. Instead of directly jumping to conclusions, the AI model:

1. **Analyzes** the problem systematically
2. **Breaks down** complex questions into smaller components  
3. **Reasons through** each step logically
4. **Provides structured** and well-thought-out responses

This approach significantly improves the model's ability to handle complex reasoning tasks, mathematical problems, coding challenges, and multi-step questions by making the thinking process explicit and transparent.

## About This Project

The Reasoning Assistant is a Next.js-powered chat interface that allows users to interact with multiple AI models with optional Chain of Thought reasoning capabilities. Users can:

- **Chat with AI models** including Deepseek R1, Gemma2 9B, and Qwen3 32B
- **Toggle thinking mode** to enable/disable Chain of Thought reasoning
- **Get help** with programming, mathematics, science, and general questions
- **Experience real-time streaming** responses with markdown rendering
- **Enjoy a modern UI** with dark/light theme support

## Tech Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI Framework**: [React 19](https://react.dev/) with TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/)
- **AI Integration**: [Groq SDK](https://groq.com/) for fast inference
- **Runtime**: [Bun](https://bun.sh/) for package management and development
- **Markdown Rendering**: React Markdown with syntax highlighting
- **Icons**: Lucide React + React Icons

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Groq API key](https://console.groq.com/keys)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reasoning-assistant
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   touch .env.local
   ```
   
   Add your Groq API key to the `.env.local` file:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```
   
   > **Getting a Groq API Key:**
   > 1. Visit [Groq Console](https://console.groq.com/keys)
   > 2. Sign up or log in to your account
   > 3. Navigate to API Keys section
   > 4. Create a new API key
   > 5. Copy and paste it into your `.env.local` file

4. **Run the development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun build` - Build the application for production
- `bun start` - Start the production server
- `bun lint` - Run ESLint for code quality

## Features

- ✨ **Multiple AI Models**: Choose from Deepseek R1, Gemma2 9B, and Qwen3 32B
- 🧠 **Chain of Thought Reasoning**: Toggle thinking mode for structured responses
- 💬 **Real-time Streaming**: Live response streaming for immediate feedback
- 🎨 **Modern UI**: Clean, responsive design with theme support
- 📝 **Markdown Support**: Rich text rendering with syntax highlighting
- 🔧 **Developer Friendly**: Built with TypeScript and modern tooling

