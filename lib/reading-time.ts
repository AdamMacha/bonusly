/**
 * Spočítá odhadovanou dobu čtení v minutách na základě počtu slov.
 * Průměrná rychlost čtení je ~200 slov za minutu.
 */
export function calculateReadingTime(content: string): number {
  if (!content) return 1;
  // Odstranění základního markdown formátování a mezer
  const cleanText = content
    .replace(/[#*`_~\[\]()>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = cleanText ? cleanText.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / 200));
}
