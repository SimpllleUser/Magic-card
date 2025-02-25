<script setup lang="ts">
  import BaseModal from '@/shared/ui/BaseModal/BaseModal.vue';
  import { QuestionItem } from '../composables/useSelectWord';
  import { Colors } from '@/core/models/enums';
  import BaseList from '@/shared/ui/BaseList/BaseList.vue';
  import { omit } from 'lodash';
  import { Icons } from '@/core/models/icons';
  import { Modals } from '@/core/models/modals';
  import { useRouter } from 'vue-router';

  type ItemResult = Omit<QuestionItem & { number: number }, 'answerId'>;

  const props = withDefaults(defineProps<{ moduleId: string; questions: QuestionItem[] }>(), {
    questions: () => []
  });

  const router = useRouter();

  const emit = defineEmits<{
    (event: 'retry'): void;
  }>();

  const mapItem = (item: QuestionItem, index: number): ItemResult => {
    const mappedItem = omit(item, 'answerId');
    return { ...mappedItem, number: index + 1, answer: mappedItem.answer || '-' };
  };
  const keys = [
    {
      title: '#',
      key: 'number'
    },
    {
      title: 'From',
      key: 'from'
    },
    {
      title: 'To',
      key: 'to'
    },
    {
      title: 'Correct',
      key: 'isCorrect'
    },
    {
      title: 'Answer',
      key: 'answer'
    }
  ].map((item) => ({
    ...item,
    sortable: false
  }));

  const getIconConfig = (value: boolean) => {
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
  const qualityOfQuizeColor = computed(() => {
    const { length } = props.questions;
    const correct = correctQuestionsQuantity.value;

    if (correct === length) return Colors.Accent; /// All correct
    if (correct >= length / 2) return Colors.Success; /// More then half correct
    if (correct < length / 2) return Colors.Warning; /// Less then half corect

    return Colors.Primary;
  });

  const onRetry = (action?: CallableFunction) => {
    emit('retry');
    action && action();
  };
</script>

<template>
  <BaseModal :id="Modals.FinishQuiz" title="Result of quiz!">
    <template #default="{ hide }">
      <div>
        <BaseList :data="props.questions" header-sticky height="20rem" hide-footer :keys="keys" :map-item="mapItem">
          <template #item.isCorrect="{ value }">
            <div class="ml-4">
              <VIcon v-bind="getIconConfig(value)" />
            </div>
          </template>
        </BaseList>
        <VDivider class="border-opacity-25 my-2" />
        <div class="total d-flex justify-center">
          <div>
            <span> Correct </span>
            <VChip class="ma-2" :color="qualityOfQuizeColor" label>
              <b>{{ correctQuestionsQuantity }}</b>
            </VChip>
            <span> From </span>
            <VChip class="ma-2" :color="Colors.Primary" label>
              <b>{{ questions.length }}</b>
            </VChip>
          </div>
        </div>
        <div class="total d-flex justify-center pt-4">
          <VBtn :color="Colors.Primary" @click="onRetry(hide)">Try again</VBtn>
          <VBtn class="ml-4" :color="Colors.Secondary" :to="{ name: 'TopicDetail', params: { id: moduleId } }">
            Go to the module
          </VBtn>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped></style>
