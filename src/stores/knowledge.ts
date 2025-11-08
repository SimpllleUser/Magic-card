import { defineStore } from 'pinia';
import { QuizType } from '@/features/quiz';
import {
  DictionaryProgress,
  KnowledgeAnalytics,
  KnowledgeEvaluation,
  LearningAdvisor
} from '@/features/knowledge';

export const useKnowledgeLevelStore = defineStore('knowledgeLevel', {
  state: () => ({
    evaluator: null as KnowledgeEvaluation | null
  }),

  getters: {
    advisor: (s) => {
      const progress = s.evaluator?.getResult();
      return progress ? LearningAdvisor.getNextActions(progress) : [];
    },
    analytics: (s) => (!s.evaluator ? null : KnowledgeAnalytics.getSummary(s.evaluator.getResult())),
    totalScore: (s) => s.evaluator?.getResult().totalScore ?? 0,
    dueWords: (s) => s.evaluator?.getWordsToReview() ?? [],
    learnedWords: (s) => s.evaluator?.getLearnedWords() ?? [],
    weakWords: (s) => s.evaluator?.getWeakWords() ?? [],
    completion: (s) => s.evaluator?.getLearningCompletion() ?? 0
  },

  actions: {
    init(dictionaryId: string, userId: string) {
      const p: DictionaryProgress = { dictionaryId, userId, words: {}, totalScore: 0 };
      this.evaluator = new KnowledgeEvaluation(p);
    },

    updateWord({ wordId, isCorrect, quizType }: { wordId: string; isCorrect: boolean; quizType: QuizType }) {
      this.evaluator?.updateWord(wordId, { isCorrect, quizType });
    },

    replaceProgress(progress: DictionaryProgress) {
      this.evaluator?.replaceProgress(progress);
    }
  }
});
