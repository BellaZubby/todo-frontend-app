import { NextRequest } from "next/server";
import OpenAI from "openai";
import { Task } from "@/app/utils/types";

/**
 * Edge runtime reduces cold starts and is ideal for short, stateless calls.
 */

export const runtime = "edge";

// define a structured error type for API-like errors
interface ApiError {
    status?: number;
    message?: string;
}

export const POST = async(req: NextRequest) => {
    try {
        // First: Parse request body and validate input shape
        const body = await req.json();
        const tasks = Array.isArray(body?.tasks) ? body.tasks : [];

        // Second: Check API key presence early to fail fast
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({error: "Missing API key"}), {status: 400});
        }

        // Third: initialize OpenAI client
        const client = new OpenAI({apiKey});

        // Fourth: Build a compact, deteministic prompt (temperature low for consistency)

        const list = tasks.length > 0 ? tasks.map((t:Task) => `-${t.title} [${t.priority}] (${t.status})`).join("\n") : "-No tasks yet";

        const prompt = `You are a productivity assistance. Given a list of tasks with title, priority (Low|Medium|High), and status (To-Do|In-Progress|Done), return exactly two sentences:
        1.  A concise summary of the current workload.
        2. A practical "priority focus" for the next hour.
        Keep it specific and actionable.

        Tasks: ${list}
        `;

        // Fifth: Call the chat completion
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{role: "user", content: prompt}],
            temperature: 0.4,
        });

        // Sixth: Extract response text safely
        const text = completion.choices?.[0]?.message?.content?.trim() || "";

        if (!text) {
            return new Response(JSON.stringify({error: "No response from the AI"}), {status: 502});
        }

        // Return result
        return new Response(JSON.stringify({result: text}), {status: 200});
    } catch (err: unknown) {
        // Error handling
        // narrow the error type
        let message = "Unknown error";
        let status = 500;

        if (err instanceof Error) {
            // standard JS error
            message = err.message;
        } else if (typeof err === "object" && err !== null) {
            // Structured API error
            const apiErr = err as ApiError;
            if (apiErr.message) message = apiErr.message;
            if (typeof apiErr.status === "number") status = apiErr.status;

        }

        return new Response(JSON.stringify({error:message}), {status});
    }
}