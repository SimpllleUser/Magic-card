<script setup lang="ts">
  import { omit } from 'lodash';
  import BaseModal from '@/shared/ui/BaseModal/BaseModal.vue';
  import { QuestionItem } from '../model/composables/useSelectWord';
  import { Colors } from '@/core/models/enums';
  import BaseList from '@/shared/ui/BaseList/BaseList.vue';
  import { Icons } from '@/core/models/icons';
  import { Modals } from '@/core/models/modals';
  import { QUIZ_RESULT_HEADER_KEYS } from '../model/constants';
  import { PageNames } from '@/router/types';
  import { QuizType } from '../model/types';
  import { useQuizStore } from '@/stores/quiz';
  import QuizeModeMenu from '@/shared/ui/QuizeModeMenu/QuizeModeMenu.vue';
  import { useNavigation } from '@/features/quiz/model/naigation';
  type ItemResult = Omit<QuestionItem & { number: number }, 'answerId'>;

  const props = withDefaults(
    defineProps<{
      moduleId: string;
      questions: QuestionItem[];
      type: QuizType;
    }>(),
    {
      questions: () => []
    }
  );

  const emit = defineEmits<{
    (event: 'retry'): void;
  }>();

  const { goToQuiz } = useNavigation();

  const quizStore = useQuizStore();

  const mapItem = (item: QuestionItem, index: number): ItemResult => {
    const mappedItem = omit(item, 'answerId');
    return { ...mappedItem, number: index + 1, answer: mappedItem.answer || '-' };
  };

  const getIconAnswer = (value: boolean) => {
    return value
      ? {
          icon: Icons.Check,
          color: Colors.Success
        }
      : {
          icon: Icons.Close,
          color: Colors.Error
        };
  };

  const correctQuestionsQuantity = computed(() => props.questions.filter((item) => item.isCorrect).length);
  const total = computed(() => `${correctQuestionsQuantity.value}/${props.questions.length}`);

  const onRetry = (action?: CallableFunction) => {
    emit('retry');
    action && action();
  };

  const retryWithWrongAnswers = (type: QuizType, action: CallableFunction) => {
    goToQuiz({
      dictionaryId: quizStore.activeModuleId,
      words: props.questions.filter((item: QuestionItem) => !item.isCorrect),
      type
    });
    emit('retry');
    action && action();
  };
</script>

<template>
  <BaseModal
    :id="Modals.FinishQuiz"
    title="Result of quiz!"
  >
    <template #default="{ hide }">
      <div>
        <BaseList
          :data="props.questions"
          header-sticky
          height="20rem"
          hide-footer
          :keys="QUIZ_RESULT_HEADER_KEYS"
          :map-item="mapItem"
        >
          <template #item.isCorrect="{ value }">
            <div class="ml-4">
              <VIcon v-bind="getIconAnswer(value)" />
            </div>
          </template>
        </BaseList>
        <VDivider class="border-opacity-25 my-2" />
        <div class="total d-flex justify-center">
          <div>
            <VChip
              class="ma-2"
              :color="Colors.Primary"
              label
            >
              <b>{{ total }}</b>
            </VChip>
          </div>
        </div>
        <div class="total d-flex justify-center pt-4">
          <VBtn
            :color="Colors.Primary"
            @click="onRetry(hide)"
            >Try again</VBtn
          >
          <div class="mx-4">
            <QuizeModeMenu
              class="mx-4"
              :color="Colors.Primary"
              label="Try again with wrong answers"
              @select="retryWithWrongAnswers($event, hide)"
            />
          </div>
          <VBtn
            :color="Colors.Secondary"
            :to="{ name: PageNames.DictionaryDetail, params: { id: moduleId } }"
          >
            Go to the module
          </VBtn>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
