import lunr from 'lunr';


const lunrBuilder = new lunr.Builder()
lunrBuilder.field('content')

export function extractLunrTokens(text: string) {
  const tokens = lunrBuilder.pipeline.run(lunr.tokenizer(text))
  const tf = new Map<string, number>()
  for (const t of tokens) {
    const word = t.toString()
    tf.set(word, (tf.get(word) || 0) + 1)
  }
  return tf;
}