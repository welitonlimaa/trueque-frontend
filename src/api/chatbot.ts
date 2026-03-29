import { AiChatbotResponseDTO } from "../types/api";
import client from "./client";

const MIN_SCORE = 1.35;

export async function queryAiChatbot(
  question: string,
  mode: string
): Promise<AiChatbotResponseDTO> {
  if (!question) {
    throw new Error('Pergunta não informada');
  }

  const res = await client.post<AiChatbotResponseDTO>(
    '/ai/chatbot/query',
    {
      index: mode,
      min_score: MIN_SCORE,
      question,
    }
  );

  return res.data;
}