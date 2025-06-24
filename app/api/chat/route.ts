import Groq from "groq-sdk";
import { SYSTEM_PROMPTS, MODELS } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

// runtime is set to edge to enable streaming responses on vercel
export const runtime = "edge";

const groq = new Groq({
	apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
	try {
		const {
			message,
			model = "llama-70b",
			useThinking = false,
		} = await req.json();

		if (!message) {
			return NextResponse.json(
				{ error: "Message is required" },
				{ status: 400 }
			);
		}

		const selectedModel =
			MODELS[model as keyof typeof MODELS] || MODELS["deepseek-r1"];
		const systemPrompt = useThinking
			? SYSTEM_PROMPTS.thinking
			: SYSTEM_PROMPTS.normal;

		// Create streaming response
		const stream = new ReadableStream({
			async start(controller) {
				try {
					const chatCompletion = await groq.chat.completions.create({
						messages: [
							{ role: "system", content: systemPrompt },
							{ role: "user", content: message },
						],
						model: selectedModel,
						stream: true,
						temperature: 0.7,
						max_tokens: 2048,
					});

					for await (const chunk of chatCompletion) {
						const content = chunk.choices[0]?.delta?.content || "";
						if (content) {
							controller.enqueue(
								new TextEncoder().encode(
									`data: ${JSON.stringify({ content })}\n\n`
								)
							);
						}
					}

					controller.enqueue(
						new TextEncoder().encode("data: [DONE]\n\n")
					);
					controller.close();
				} catch (error) {
					console.error("Streaming error:", error);
					controller.error(error);
				}
			},
		});

		return new Response(stream, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
			},
		});
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
