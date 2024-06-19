<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { WordEntity } from 'src/features/words/types/word';
  import { useQuize } from 'src/features/quize/composables/useQuize';
  import { useModal } from 'src/shared/composables/useModal';
  import QuizeResultList from 'src/features/quize/components/QuizeResultList.vue';

  const props = defineProps<{
    words: Array<WordEntity>;
  }>();

  const { queueOfQuestion, getVariantsOfQuestion, setAnswer, isSelectedVariant, resultOfQuize, resetResult } = useQuize(
    props.words
  );
  const quizeResultModal = useModal('quize-result-modal');

  const options = queueOfQuestion.value.map((question, index) => {
    return {
      label: index + 1,
      value: index,
      slot: `btn-${index}`
    };
  });

  const slideIndex = ref<string>(options[0].value);
  const variantsOfQuestion = queueOfQuestion.value.reduce(
    (variants, question) => ({
      ...variants,
      [question.id]: getVariantsOfQuestion(props.words, question.id)
    }),
    {}
  );

  const onToFinnish = () => {
    quizeResultModal.show();
  };

  const onResetResult = () => {
    resetResult();
    quizeResultModal.hide();
    slideIndex.value = options[0].value;
  };

  const activeItem = computed(() => queueOfQuestion.value[slideIndex.value]);
</script>

<template>
  <quize-result-list :result="resultOfQuize" @reset="onResetResult" />
  <div>
    <q-btn @click="onResetResult" color="primary">Refresh</q-btn>
    <transition name="slide-fade" mode="out-in">
      <div :key="activeItem.id">
        <div control-color="primary" class="carousel-main rounded-borders">
          <div height="200px" class="no-wrap flex-center">
            <div class="q-mt-md text-h1 text-center q-pb-lg">{{ activeItem.question }}</div>
            <div class="row justify-center wrap">
              <q-btn
                class="q-ma-sm"
                :outline="!isSelectedVariant(activeItem.id, variant.id)"
                color="secondary"
                v-for="variant in variantsOfQuestion[activeItem.id]"
                :key="variant"
                @click="setAnswer(activeItem.id, variant.id)"
                no-caps
              >
                <span class="text-black">{{ variant.word }}</span>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="row justify-center">
      <q-btn-toggle v-model="slideIndex" :options="options" />
      <q-btn class="q-ml-md" color="primary" outline @click="onToFinnish">Finish</q-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .carousel-main {
    height: initial;
    overflow: hidden;
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    opacity: 0;
  }
</style>
