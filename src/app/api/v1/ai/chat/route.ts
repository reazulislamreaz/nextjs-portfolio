import { NextResponse, type NextRequest } from "next/server";
import { aiChatController } from "@/server/ai/controllers/ai-chat.controller";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const response = await aiChatController.chat(body);
    return NextResponse.json(response);
  } catch (error) {
    const response = aiChatController.toErrorResponse(error);
    return NextResponse.json(response.body, { status: response.status });
  }
}

