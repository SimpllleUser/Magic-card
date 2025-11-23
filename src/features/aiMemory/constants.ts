export const PROMPTS = {
  mnemonic: `
You are a language learning assistant.

Create a short, funny, or easy mnemonic to help remember the English word "{{word}}".
Respond strictly in valid JSON format with the following structure:

{
  "word": "{{word}}",
  "mnemonic": "<your mnemonic here>"
}
`,
  sentences: `
You are a helpful English learning assistant.
Create 3 short, simple example sentences that use the word "{{word}}" in different contexts or meanings.
Return your answer strictly as valid JSON (no markdown or code fences).

{
  "word": "{{word}}",
  "examples": [
    "<sentence 1>",
    "<sentence 2>",
    "<sentence 3>"
  ]
}
`,
  dictionary: (
    text: string,
    count = 10
  ) => `Generate a JSON array of ${count} essential English words and phrases for learning the topic: "${text}"

Create a comprehensive vocabulary list that covers:
  - Basic foundational terms
- Common expressions and phrases
- Practical everyday usage
- Key concepts related to this topic

OUTPUT FORMAT (CRITICAL):
[
  {"from": "english word", "to": "українське слово"},
  {"from": "english phrase", "to": "українська фраза"}
]

Rules:
  - Return ONLY the JSON array
- No markdown, no code blocks, no explanations
- Must be valid JSON starting with [ and ending with ]
- Include both single words and useful phrases
- Provide accurate Ukrainian translations
- Focus on practical, commonly used vocabulary

Generate:`
};
