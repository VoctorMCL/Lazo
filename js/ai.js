/* ============================================================
   CONTROLADOR DE IA / Conexión con la API de Gemini
   ============================================================ */

// Reemplaza esta clave con una nueva válida desde AI Studio
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

// ------------------------------------------------------------------
// 1. Función para el simulador de diálogo (juego de rol)
// ------------------------------------------------------------------
export async function getAIResponse(scenario, messages) {
    try {
        const systemInstruction = `
Eres un simulador pedagógico para estudiantes de secundaria sobre resolución de conflictos escolares. Participas en un juego de rol interactivo donde representas a un personaje específico.

Escenario actual: "${scenario.title}" - ${scenario.text}
Personaje que interpretas: "${scenario.personaje}", cuyo estado emocional actual es: "${scenario.personajeEstado}".
Objetivo de aprendizaje que el estudiante debe alcanzar conversando contigo: "${scenario.objetivo}".

Instrucciones:
1. Responde siempre como el personaje (${scenario.personaje}), manteniendo fielmente su tono emocional, dudas y resistencia inicial. No rompas el personaje en ningún momento.
2. Evalúa las respuestas del usuario de forma implícita. Si el estudiante muestra empatía, escucha activa o propone soluciones pacíficas, haz que el personaje ceda progresivamente y se muestre más receptivo. Si el estudiante ataca, culpa o minimiza, el personaje reaccionará con defensividad o desconfianza, acorde al conflicto.
3. Solo cuando consideres que la conversación ha tenido al menos tres intercambios sustanciales por parte del usuario y se ha avanzado significativamente hacia el objetivo, incluye al final de tu respuesta una retroalimentación pedagógica con el siguiente formato exacto:
[FEEDBACK]: (aquí escribe tu evaluación sobre la escucha activa, la mediación y si se ha cumplido el objetivo, de forma concisa y constructiva).

No incluyas feedback antes de alcanzar ese mínimo de intercambios. La retroalimentación debe ser opcional y solo aparecer cuando el logro sea evidente.
`;

        const recentMessages = messages.slice(-4);
        const contents = recentMessages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
        }));

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: systemInstruction }] },
                contents: contents
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("Error de Gemini (simulador):", data.error);
            // Devolvemos un mensaje de error sin emojis
            if (data.error.code === 429) {
                return { reply: "[Error] El servicio de IA ha agotado sus créditos. Contacta al administrador.", feedback: null };
            } else if (data.error.code === 403) {
                return { reply: "[Error] Clave API inválida. Verifica la configuración.", feedback: null };
            } else {
                return { reply: `[Error] ${data.error.message || "Error desconocido"}`, feedback: null };
            }
        }

        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Te escucho...";

        let reply = rawText;
        let feedback = null;

        if (rawText.includes("[FEEDBACK]:")) {
            const parts = rawText.split("[FEEDBACK]:");
            reply = parts[0].trim();
            feedback = parts[1].trim();
        }

        return { reply, feedback };

    } catch (error) {
        console.error("Error de red en simulador:", error);
        return { reply: "Error de conexión. Intenta de nuevo más tarde.", feedback: null };
    }
}

// ------------------------------------------------------------------
// 2. Función para el chatbot lateral (asistente general)
// ------------------------------------------------------------------
export async function getChatbotResponse(messages) {
    try {
        const systemInstruction = `
Eres un asistente especializado exclusivamente en temas de convivencia escolar, resolución de conflictos, mediación, escucha activa y comunicación interpersonal en el ámbito educativo. 
Tu función es responder preguntas, dar consejos prácticos y ofrecer estrategias para mejorar el clima escolar, manejar desacuerdos y fomentar el diálogo respetuoso.

Si el usuario formula una pregunta sobre cualquier tema ajeno a este ámbito (por ejemplo: matemáticas, deportes, ciencia, entretenimiento, etc.), debes responder únicamente con el siguiente texto exacto, sin añadir nada más:
"Lo siento, solo puedo ayudarte con temas de convivencia escolar."

No proporciones información fuera de tu campo de especialización. Mantén un tono neutral, empático y didáctico. Tus respuestas deben ser breves, claras y orientadas a la acción.
`;

        // Solo los últimos 3 mensajes para ahorrar tokens
        const recent = messages.slice(-3);
        const contents = recent.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
        }));

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: systemInstruction }] },
                contents: contents
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("Error de Gemini (chatbot):", data.error);
            if (data.error.code === 429) {
                return "[Error] El servicio de IA ha agotado sus créditos. Contacta al administrador.";
            } else if (data.error.code === 403) {
                return "[Error] Clave API inválida. Verifica la configuración.";
            } else {
                return `[Error] ${data.error.message || "Error desconocido"}`;
            }
        }

        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No tengo una respuesta en este momento.";
    } catch (error) {
        console.error("Error de red en chatbot:", error);
        return "Error de conexión. Intenta de nuevo más tarde.";
    }
}