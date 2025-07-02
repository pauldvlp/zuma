import type { Release } from '@/types/releases'
import type { Repo } from '@/types/repos'
import { ApiError, GoogleGenAI, type Content } from '@google/genai/web'

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY })

export async function generateSummary(repo: Repo, release: Release, abortSignal?: AbortSignal) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `A continuación recibirás dos objetos JSON: el primero con información general de un repositorio de GitHub y el segundo con información de una release específica de ese repositorio. Dentro del segundo objeto (release) encontrarás la propiedad \`body\`, que contiene en formato Markdown la descripción de los cambios, mejoras y nuevas funcionalidades introducidas en esta versión.

Tu tarea es generar un **resumen técnico claro, útil y bien estructurado**, enfocado principalmente en la información contenida en la propiedad \`body\`. Sin embargo, no te limites a parafrasear o resumir literalmente el contenido; debes:

- Analizar, sintetizar y enriquecer la información proporcionada.
- Complementar con detalles adicionales relevantes investigando en otras fuentes públicas si es necesario (por ejemplo: documentación oficial, issues o pull requests, blogs técnicos, CHANGELOGs u otros enlaces incluidos en el body).

El resumen debe:

- Estar redactado en **español**.
- Presentarse exclusivamente en **formato Markdown**.
- Comenzar siempre con el **título de la release o un título generado que sea claro y representativo**, sin iniciar con frases como “Aquí tienes…”.
- Incluir ejemplos ilustrativos o fragmentos de código que ayuden a comprender los cambios o nuevas funcionalidades, utilizando la sintaxis correcta de bloques de código. Ejemplo:

\`\`\`js
// Ejemplo de uso de la nueva función
const resultado = nuevaFuncion(parametro);
\`\`\`

- Agrupar la información por secciones temáticas si aplica (por ejemplo: 🆕 Nuevas funcionalidades, 🛠️ Mejoras, 🐛 Correcciones, ⚠️ Breaking changes).
- Eliminar detalles innecesarios o repetitivos para desarrolladores.
- Aportar explicaciones claras y profundas si alguna funcionalidad lo requiere.
- Ser accesible para usuarios técnicos y comprensible para quienes tengan un conocimiento general del proyecto.
- No incluir información sobre contribuidores nuevos u otros colaboradores.
- Si la propiedad body no contiene la información suficiente pero enlaza a CHANGELOGs, READMEs u otras fuentes, léelas e investiga en internet si es necesario para construir un resumen completo y preciso.
- Terminar siempre con un bloque de enlaces que incluya:
  - Link al repositorio de GitHub
  - Link a la release específica
  - Links a las demás fuentes consultadas

No incluyas ningún texto fuera del Markdown, ni explicaciones sobre el prompt o instrucciones. Entrega únicamente el resumen final, comenzando directamente con el título y siguiendo el formato anterior.` }]
        },
        {
          role: 'user',
          parts: [{ text: JSON.stringify(repo) }]
        },
        {
          role: 'user',
          parts: [{ text: JSON.stringify(release) }]
        }
      ] as Content[],
      config: {
        abortSignal,
        tools: [{ googleSearch: {} }]
      }
    })
    return { markdown: response.text, error: null }
  }
  catch (error) {
    const { message } = error as Error

    if (error instanceof ApiError) {
      return { markdown: null, error: message }
    }

    if (message.includes('exception AbortError')) {
      return { markdown: null, error: 'La generación fue cancelada por el usuario.' }
    }

    return { markdown: null, error: `Error desconocido: ${message}` }
  }
}
