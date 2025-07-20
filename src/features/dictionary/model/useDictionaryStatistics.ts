// function isComplexLanguagePair(fromWord: string, toWord: string): boolean {
//   // Визначаємо мову на основі алфавіту/символів
//   const sourceLanguage = detectLanguage(fromWord);
//   const targetLanguage = detectLanguage(toWord);

//   // Складні пари мов (різні алфавіти, граматичні системи)
//   const complexPairs = [
//     ['latin', 'cyrillic'], // англійська ↔ українська/російська
//     ['latin', 'arabic'], // англійська ↔ арабська
//     ['latin', 'chinese'], // англійська ↔ китайська
//     ['latin', 'japanese'], // англійська ↔ японська
//     ['cyrillic', 'arabic'],
//     ['cyrillic', 'chinese']
//   ];

//   return complexPairs.some(
//     ([lang1, lang2]) =>
//       (sourceLanguage === lang1 && targetLanguage === lang2) || (sourceLanguage === lang2 && targetLanguage === lang1)
//   );
// }

// function detectLanguage(word: string): string {
//   // Кирилиця (українська, російська, болгарська тощо)
//   if (/[а-яёїєґі]/i.test(word)) return 'cyrillic';

//   // Арабська
//   if (/[\u0600-\u06FF]/.test(word)) return 'arabic';

//   // Китайська (CJK символи)
//   if (/[\u4e00-\u9fff]/.test(word)) return 'chinese';

//   // Японська (хірагана, катакана)
//   if (/[\u3040-\u309f\u30a0-\u30ff]/.test(word)) return 'japanese';

//   // За замовчуванням - латиниця
//   return 'latin';
// }

// function calculateComplexityByWord(word: { from: string; to: string }): number {
//   let complexity = 0;

//   const length = word.to.length;
//   if (length <= 4) complexity += 0.1;
//   else if (length <= 7) complexity += 0.2;
//   else if (length <= 10) complexity += 0.3;
//   else complexity += 0.4;

//   const rareCombinations = ['gh', 'ph', 'th', 'ough', 'eigh'];
//   rareCombinations.forEach((combo) => {
//     if (word.to.toLowerCase().includes(combo)) complexity += 0.1;
//   });

//   if (/(.)\1/.test(word.to)) complexity += 0.1;

//   if (isComplexLanguagePair(word.from, word.to)) complexity += 0.2;

//   return Math.min(complexity, 0.1);
// }

// let levelOfKnovingWord: 'learned' | 'wordNeedsAdditionalRepetition' | null = null;

export type LevelKnoving = 'learned' | 'wordNeedsAdditionalRepetition';

export function useDictionaryStatistics(params: any) {
  const totalNumberOFAttempts = 0;
  // Total number of attempts for the word

  /// Correct Answers,
  const CA = 0; /// Скільки слів/питань користувач відповів правильно.

  /// Incorrect Answers
  const IA = 0; /// Скільки слів/питань користувач відповів неправильно.

  /// Total Questions
  const TQ = 0; ///  Скільки питань було у квізі

  /// Accuracy (ACC); Показник успішності у відсотках.
  /// Time Taken
  const TT = 0; ///  Скільки часу користувач витратив на квіз.

  /// Average Time per Question (ATQ)
  /// Середній час,витрачений на відповідь на одне питання.

  /// Word Mastery (WM)
  /// Оцінка, наскільки добре користувач засвоїв конкретні слова

  /// Difficulty
  // const DL = 0; /// Рівень складності

  const ACC = (CA / TQ) * 100;
  const ATQ = TT / TQ;
  const WM = (CA / totalNumberOFAttempts) * 100; /// if >= 80 learned; if <= 50 wordNeedsAdditionalRepetition;

  /// Efficiency Score
  /// Поєднує точність і швидкість
  const ES = ACC * (1 / ATQ); /// then higher then better

  return {};
}
