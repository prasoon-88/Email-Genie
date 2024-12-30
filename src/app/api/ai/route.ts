import { generateContent } from "@/utils/api/generativeAI";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    return await generateContent(prompt);
  } catch (error) {
    console.log(error);
  }
}
