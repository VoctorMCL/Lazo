import { Scenario } from './data';
import { buildSimulatorInstruction, buildChatbotInstruction } from './prompt';

const PROXY_BASE_URL = 'https://lazo.cordobavictorml.workers.dev';
const MODEL_PATH = 'gemini-3.5-flash-lite';
const MAX_HISTORY_TURNS = 6;

export const ERROR_PREFIX = '[Error]';

export function isAiError(text: string): boolean {
  return text.trim().startsWith(ERROR_PREFIX);
}

export interface AiReply {
  reply: string;
  feedback: string | null;
  achieved: boolean;
}

export type AiResult = { ok: true; text: string } | { ok: false; message: string };

interface InputMessage {
  sender: string;
  text: string;
}

interface GeminiContent {
  role: 'user' | 'model';
  parts: { text: string }[];
}

function toGeminiContents(messages: InputMessage[], contextUserText: string): GeminiContent[] {
  const turns = messages
    .filter((m) => !isAiError(m.text))
    .filter((m) => m.sender === 'user' || m.sender === 'character' || m.sender === 'bot')
    .map((m) => ({
      role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
      text: m.text,
    }));

  const merged: { role: 'user' | 'model'; text: string }[] = [];
  for (const turn of turns) {
    const last = merged[merged.length - 1];
    if (last && last.role === turn.role) {
      last.text += '\n' + turn.text;
    } else {
      merged.push({ ...turn });
    }
  }

  const trimmed = merged.slice(-MAX_HISTORY_TURNS);
  if (trimmed.length === 0 || trimmed[0].role !== 'user') {
    trimmed.unshift({ role: 'user', text: contextUserText });
  }

  return trimmed.map((t) => ({ role: t.role, parts: [{ text: t.text }] }));
}

async function callGemini(systemInstruction: string, contents: GeminiContent[]): Promise<AiResult> {
  try {
    const response = await fetch(`${PROXY_BASE_URL}/${MODEL_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Error de Gemini:', data.error);
      if (data.error.code === 429) {
        return { ok: false, message: `${ERROR_PREFIX} El servicio de IA ha agotado sus créditos. Contacta al administrador.` };
      }
      if (data.error.code === 403) {
        return { ok: false, message: `${ERROR_PREFIX} Clave API inválida. Verifica la configuración.` };
      }
      return { ok: false, message: `${ERROR_PREFIX} ${data.error.message || 'Error desconocido'}` };
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return { ok: false, message: `${ERROR_PREFIX} Respuesta vacía del servicio de IA.` };
    }
    return { ok: true, text };
  } catch (error) {
    console.error('Error de red:', error);
    return { ok: false, message: `${ERROR_PREFIX} Error de conexión. Intenta de nuevo más tarde.` };
  }
}

export async function getAIResponse(scenario: Scenario, messages: InputMessage[]): Promise<AiReply> {
  const systemInstruction = buildSimulatorInstruction(scenario);
  const contextUserText = `Quiero practicar esta situación: "${scenario.title}". ${scenario.text}`;
  const contents = toGeminiContents(messages, contextUserText);

  const result = await callGemini(systemInstruction, contents);
  if (!result.ok) {
    return { reply: result.message, feedback: null, achieved: false };
  }

  const rawText = result.text;
  let reply = rawText;
  let feedback: string | null = null;

  if (rawText.includes('[FEEDBACK]:')) {
    const parts = rawText.split('[FEEDBACK]:');
    reply = parts[0].trim();
    feedback = parts.slice(1).join('[FEEDBACK]:').trim() || null;
  }

  if (!reply) {
    reply = feedback ? '...' : 'Te escucho...';
  }

  return { reply, feedback, achieved: feedback !== null };
}

export async function getChatbotResponse(messages: InputMessage[]): Promise<AiResult> {
  const systemInstruction = buildChatbotInstruction();
  const contextUserText = 'Quiero hacer una consulta sobre convivencia escolar.';
  const contents = toGeminiContents(messages, contextUserText);

  return callGemini(systemInstruction, contents);
}
