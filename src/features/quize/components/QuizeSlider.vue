<script lang="ts" setup>
  import { ref } from 'vue';
  import { useQuize } from 'src/features/quize/composables/useQuize';
  import { WordEntity } from 'src/features/words/types/word';

  const props = defineProps<{
    words: Array<WordEntity>;
  }>();

  const { queueOfQuestion, getVariantsOfQuestion, setAnswer, isSelectedVariant, total } = useQuize(props.words);

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
</script>

<template>
  <div>
    <div>
      <q-carousel
        v-model="activeSlide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
        class="rounded-borders"
      >
        <q-carousel-slide
          v-for="item in queueOfQuestion"
          :key="item.id"
          :name="item.id"
          class="column no-wrap flex-center"
        >
          <div class="q-mt-md text-h4 text-center">{{ item.question }}</div>
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
              <span class="text-black">{{ variant.word }} - {{ variant.id === item.id }}</span>
            </q-btn>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="row justify-center">
      <q-btn-toggle v-model="activeSlide" :options="options" />
    </div>
  </div>
</template>
