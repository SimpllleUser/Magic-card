export type LevelOfKnowledge = 'learned' | 'wordNeedsAdditionalRepetition';
/*
  Записувати дані статистики для кожної сесії.
  Потім можна буде сумувати всі показники та покувати як загальний результат
  по кожному слову
*/

interface DictionaryStatistics {
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  timeTaken: number;
}
/*
  TODO винести в store для зберігання даних

  Самі обчислення треба винести в окремий файл helper
  Всі дани зберігат в store, як ключ використовувати дату та час
 */
export function useDictionaryStatistics(params: DictionaryStatistics) {
  const totalNumberOFAttempts = 0;

  const CA = params.correctAnswers; /// Correct Answers, Скільки слів/питань користувач відповів правильно.

  const IA = params.incorrectAnswers; /// Incorrect Answers Скільки слів/питань користувач відповів неправильно.

  const TQ = params.totalQuestions; ///  Total Questions (TQ) Скільки питань було у квізі

  /// Accuracy (ACC); Показник успішності у відсотках

  const TT = params.timeTaken; /// Time Taken  Скільки часу користувач витратив на квіз.

  /// Average Time per Question (ATQ) Середній час,витрачений на відповідь на одне питання.

  /// Word Mastery (WM) - Оцінка, наскільки добре користувач засвоїв конкретні слова

  /// const DL = 0;  Difficulty (DL) - Рівень складності  Додати кеф в залежнеості від типу quiz

  const ACC = (CA / TQ) * 100;
  const ATQ = TT / TQ;
  const WM = (CA / totalNumberOFAttempts) * 100; /// if >= 80 learned; if <= 50 wordNeedsAdditionalRepetition;

  /// Efficiency Score (ES) Поєднує точність і швидкість
  const ES = ACC * (1 / ATQ); /// then higher then better

  return {};
}
