/**
 * Estima el tiempo de lectura de un texto.
 * @param content - El texto o HTML del contenido.
 * @param wpm - Palabras por minuto (por defecto 225, estándar medio).
 */
export function estimateReadingTime(content: string, wpm: number = 225): number {
  if (!content) return 0;
  const text = content.replace(/<[^>]*>?/gm, "");
  const words = text.trim().split(/\s+/).length;

  const time = Math.ceil(words / wpm);

  return time;
}
