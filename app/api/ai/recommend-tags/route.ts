import { NextResponse } from "next/server";
import { z } from "zod";

import { parseTagList } from "@/lib/tags";

const requestSchema = z.object({
  url: z.string().trim().optional().default(""),
  title: z.string().trim().optional().default(""),
  description: z.string().trim().optional().default(""),
  notes: z.string().trim().optional().default(""),
});

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
    finishReason?: string;
  }>;
  error?: {
    message?: string;
    status?: string;
  };
};

function getGeminiText(data: GeminiResponse) {
  return data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join(" ") ?? "";
}

export async function POST(request: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  const validated = requestSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { url, title, description, notes } = validated.data;

  if (!url && !title && !description && !notes) {
    return NextResponse.json(
      { error: "Enter some link details first." },
      { status: 400 },
    );
  }

  const prompt = [
    "Recommend 3 to 6 short tags for a saved web link.",
    "Return only a comma-separated list of lowercase tags.",
    "Do not add numbering, prefixes, or extra explanation.",
    `url: ${url || "n/a"}`,
    `title: ${title || "n/a"}`,
    `description: ${description || "n/a"}`,
    `notes: ${notes || "n/a"}`,
  ].join("\n");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 120,
        },
      }),
    },
  );

  const data = (await response.json().catch(() => null)) as GeminiResponse | null;

  if (!response.ok) {
    const errorMessage = data?.error?.message ?? "Gemini request failed.";

    if (errorMessage.toLowerCase().includes("quota")) {
      return NextResponse.json(
        {
          error:
            "Gemini API quota is exceeded. Check your Google AI Studio billing or usage limits.",
        },
        { status: 429 },
      );
    }

    return NextResponse.json(
      { error: `Gemini request failed: ${errorMessage}` },
      { status: response.status },
    );
  }

  const content = getGeminiText(data ?? {});
  const tags = parseTagList(content).map((tag) => tag.toLowerCase()).slice(0, 6);

  if (tags.length === 0) {
    return NextResponse.json(
      { error: "Gemini returned no usable tags." },
      { status: 500 },
    );
  }

  return NextResponse.json({ tags });
}
