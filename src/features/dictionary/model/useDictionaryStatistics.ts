export function useDictionaryStatistics() {
  function isComplexLanguagePair(fromWord: string, toWord: string): boolean {
    // Визначаємо мову на основі алфавіту/символів
    const sourceLanguage = detectLanguage(fromWord);
    const targetLanguage = detectLanguage(toWord);

    // Складні пари мов (різні алфавіти, граматичні системи)
    const complexPairs = [
      ['latin', 'cyrillic'], // англійська ↔ українська/російська
      ['latin', 'arabic'], // англійська ↔ арабська
      ['latin', 'chinese'], // англійська ↔ китайська
      ['latin', 'japanese'], // англійська ↔ японська
      ['cyrillic', 'arabic'],
      ['cyrillic', 'chinese']
    ];

    return complexPairs.some(
      ([lang1, lang2]) =>
        (sourceLanguage === lang1 && targetLanguage === lang2) || (sourceLanguage === lang2 && targetLanguage === lang1)
    );
  }

  function detectLanguage(word: string): string {
    // Кирилиця (українська, російська, болгарська тощо)
    if (/[а-яёїєґі]/i.test(word)) return 'cyrillic';

    // Арабська
    if (/[\u0600-\u06FF]/.test(word)) return 'arabic';

    // Китайська (CJK символи)
    if (/[\u4e00-\u9fff]/.test(word)) return 'chinese';

    // Японська (хірагана, катакана)
    if (/[\u3040-\u309f\u30a0-\u30ff]/.test(word)) return 'japanese';

    // За замовчуванням - латиниця
    return 'latin';
  }

  function calculateComplexityByWord(word: { from: string; to: string }): number {
    let complexity = 0;

    const length = word.to.length;
    if (length <= 4) complexity += 1;
    else if (length <= 7) complexity += 2;
    else if (length <= 10) complexity += 3;
    else complexity += 4;

    const rareCombinations = ['gh', 'ph', 'th', 'ough', 'eigh'];
    rareCombinations.forEach((combo) => {
      if (word.to.toLowerCase().includes(combo)) complexity += 1;
    });

    if (/(.)\1/.test(word.to)) complexity += 1;

    if (isComplexLanguagePair(word.from, word.to)) complexity += 2;

    return Math.min(complexity, 10);
  }
  return {
    calculateComplexityByWord
  };
}
