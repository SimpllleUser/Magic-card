export interface WiktionaryEntity {
  word: string;
  entries: WiktionaryEntry[];
  source: {
    url: string;
    license: {
      name: string;
      url: string;
    };
  };
}

export interface WiktionaryEntry {
  language: {
    code: string;
    name: string;
  };
  partOfSpeech: string;
  pronunciations: Pronunciation[];
  forms: WordForm[];
  senses: Sense[];
  synonyms: string[];
  antonyms: string[];
}

export interface Pronunciation {
  type: 'ipa' | string;
  text: string;
  tags: string[];
}

export interface WordForm {
  word: string;
  tags: string[];
}

export interface Sense {
  definition: string;
  tags: string[];
  examples: string[];
  quotes: Quote[];
  synonyms: string[];
  antonyms: string[];
  subsenses: Sense[];
}

export interface Quote {
  text: string;
  reference?: string;
}
