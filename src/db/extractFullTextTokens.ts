// English stop words (common words to filter out)
const stopWords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it',
  'its', 'of', 'on', 'that', 'the', 'to', 'was', 'will', 'with', 'but', 'or', 'not', 'this', 'can'
])

// Simple English stemmer (basic suffix removal)
const simpleStem = (word: string): string => {
  // Remove common suffixes for basic stemming (longest first to avoid conflicts)
  if (word.endsWith('ings') && word.length > 4) return word.slice(0, -4)
  if (word.endsWith('tion') && word.length > 5) return word.slice(0, -4) // creation -> creat
  if (word.endsWith('ness') && word.length > 5) return word.slice(0, -4) // darkness -> dark
  if (word.endsWith('ment') && word.length > 5) return word.slice(0, -4) // development -> develop
  if (word.endsWith('able') && word.length > 5) return word.slice(0, -4) // readable -> read
  if (word.endsWith('ible') && word.length > 5) return word.slice(0, -4) // possible -> poss
  if (word.endsWith('ing') && word.length > 4) return word.slice(0, -3)
  if (word.endsWith('ers') && word.length > 4) return word.slice(0, -3) // developers -> develop
  if (word.endsWith('ies') && word.length > 4) return word.slice(0, -3) // libraries -> librar
  if (word.endsWith('ied') && word.length > 4) return word.slice(0, -3) // specified -> specif
  // Keep only safe -ed patterns, avoid overly specific ones
  if (word.endsWith('ly') && word.length > 3) return word.slice(0, -2)
  if (word.endsWith('er') && word.length > 3) return word.slice(0, -2) // getter -> gett  
  if (word.endsWith('ed') && word.length > 3) return word.slice(0, -2) // general -ed rule
  if (word.endsWith('es') && word.length > 3) return word.slice(0, -2)
  if (word.endsWith('or') && word.length > 3) return word.slice(0, -2) // constructor -> construct
  if (word.endsWith('al') && word.length > 3) return word.slice(0, -2) // functional -> function
  if (word.endsWith('ic') && word.length > 3) return word.slice(0, -2) // dynamic -> dynam
  if (word.endsWith('s') && word.length > 2) return word.slice(0, -1)
  return word
}

export function extractFullTextTokens(text: string, minChars = 2): Map<string, number> {
  const tf = new Map<string, number>()
  
  if (!text || text.length === 0) return tf
  
  const tokens = text
    .toLowerCase()
    .split(/[\s\-_.,:;!?()\[\]{}|\\\/\n\r\t"'`]+/)
    .filter((token: string) => {
      // Filter out short tokens, numbers, and programming noise
      if (token.length < minChars) return false
      if (/^\d+$/.test(token)) return false
      if (['var', 'let', 'const', 'function', 'if', 'else', 'for', 'while', 'return'].includes(token)) return false
      return true
    })
    .map((token: string) => {
      // Clean up punctuation and apply stemming
      const cleaned = token.replace(/^[^\w]+|[^\w]+$/g, '')
      const stemmed = simpleStem(cleaned)
      return stemmed.length > 20 ? stemmed.slice(0, 20) : stemmed;
    })
    .filter((token: string) => {
      // Final filtering: length check and stop words
      return token.length >= minChars && !stopWords.has(token)
    })

  // Count token frequencies
  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1)
  }
  
  return tf
}