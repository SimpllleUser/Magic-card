<script setup lang="ts">
  import { Colors, Icons, Sizes, Variants } from '@/core';
  import { useMemoryTips } from '@/features/aiMemory/model/useMemoryTips';

  defineOptions({ name: 'MemoryTips' });

  interface Props {
    word: string;
  }

  const props = defineProps<Props>();

  const currentWord = computed(() => props.word);

  const { tips, existSomeTip, generateSentences, generateMnemonic } = useMemoryTips(currentWord);
</script>

<template>
  <div
    class="memory-tips_card position-relative mx-auto border rounded-lg pa-4"
    :class="`border-${Colors.Info}`"
  >
    <div class="d-flex align-center justify-center">
      <VChip
        class="pa-2 d-flex justify-center align-center"
        :color="Colors.Info"
      >
        <VIcon
          class="d-block"
          :icon="Icons.Creation"
          :size="24"
        />
        <span class="pl-2"> Generate </span>
      </VChip>
    </div>
    <div class="d-flex justify-center pt-4">
      <VBtn
        :color="Colors.Secondary"
        :size="Sizes.Small"
        :variant="Variants.Text"
        @click="generateMnemonic"
      >
        Mnemonic
      </VBtn>
      <VBtn
        class="ml-2"
        :color="Colors.Secondary"
        :size="Sizes.Small"
        :variant="Variants.Text"
        @click="generateSentences"
      >
        Sentences
      </VBtn>
    </div>
  </div>
  <VCard
    v-if="existSomeTip"
    class="mt-6 memory-tips_result mx-auto elevation-0"
  >
    <VCardText
      v-if="tips.mnemonic"
      class="tip center mb-2"
    >
      <div class="tip_label text-grey-lighten-1">Mnemonic:</div>
      <div
        class="tip_value"
        v-html="tips.mnemonic"
      />
    </VCardText>
    <VCardText
      v-if="tips.sentences"
      class="tip mb-2"
    >
      <div class="tip_label text-grey-lighten-1">Sentences:</div>
      <div
        v-for="(sentence, index) in tips.sentences"
        :key="sentence"
        class="tip_sentence d-flex align-start"
        :class="{ 'mt-2': index }"
      >
        <div class="pr-1">{{ index + 1 }})</div>
        <div
          class="tip_value"
          v-html="sentence"
        />
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss">
  .memory-tips_card {
    max-width: 20rem;
  }
  .memory-tips_result {
    max-width: 35rem;
  }
</style>
