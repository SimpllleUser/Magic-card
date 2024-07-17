<script lang="ts" setup>
  import { ref } from 'vue';
  import { useQuize } from 'src/shared/lib/use/useQuize';
  import { useModal } from 'src/shared/lib/use/useModal';
  import { WordEntity } from 'src/features/words/types/word';
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
      value: question.id,
      slot: `btn-${index}`
    };
  });

  const activeSlide = ref<string>(options[0].value);
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
  };
</script>

<template>
  <QuizeResultList :result="resultOfQuize" @reset="onResetResult" />
  <div>
    <div>
      <q-carousel
        v-model="activeSlide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
        class="carousel-main rounded-borders"
      >
        <q-carousel-slide
          v-for="item in queueOfQuestion"
          :key="item.id"
          :name="item.id"
          height="200px"
          class="no-wrap flex-center"
        >
          <div class="q-mt-md text-h1 text-center q-pb-lg">{{ item.question }}</div>
          <div class="row justify-center wrap">
            <q-btn
              class="q-ma-sm"
              :outline="!isSelectedVariant(item.id, variant.id)"
              color="secondary"
              v-for="variant in variantsOfQuestion[item.id]"
              :key="variant"
              @click="setAnswer(item.id, variant.id)"
              no-caps
            >
              <span class="text-black">{{ variant.word }}</span>
            </q-btn>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="row justify-center">
      <q-btn-toggle v-model="activeSlide" :options="options" />
      <q-btn class="q-ml-md" color="primary" outline @click="onToFinnish">Finish</q-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
