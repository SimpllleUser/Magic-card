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
`
};
