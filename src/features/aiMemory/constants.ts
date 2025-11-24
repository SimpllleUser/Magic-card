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
  ) => `Generate a comprehensive vocabulary learning set for the topic: "${text}"

Create a JSON object with:
1. description - a brief overview of what vocabulary is covered (in English)
2. items - an array of ${count} translation pairs

OUTPUT FORMAT (CRITICAL):
{
  "description": "A brief description of the vocabulary set",
  "items": [
    {"from": "english word", "to": "українське слово"},
    {"from": "english phrase", "to": "українська фраза"}
  ]
}

Content requirements for items:
- Basic foundational terms
- Common expressions and phrases
- Practical everyday usage
- Key concepts related to "${text}"

Rules:
- Return ONLY the JSON object
- No markdown, no code blocks, no explanations
- Must be valid JSON starting with { and ending with }
- Description should be 1-2 sentences
- Include both single words and useful phrases in items array
- Provide accurate Ukrainian translations
- Focus on practical, commonly used vocabulary
- Your response must START with {
- Your response must END with }

Generate:`
};
