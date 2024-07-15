<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { useModulesStore } from 'src/features/module/store/modules';
  import { getRandomizedArray } from 'src/features/quize/utils';
  import { WordEntity } from 'src/features/words/types/word';
  import QuizeSlider from 'src/features/quize/components/QuizeSlider.vue';

  const moduleId = useRoute();
  const modulesStore = useModulesStore();
  const wordList = computed(() =>
    getRandomizedArray<Array<WordEntity>>(modulesStore.getById(moduleId.params.id).words)
  );
</script>

<template>
  <div>
    <div>
      <QuizeSlider :words="wordList" />
    </div>
  </div>
</template>

<style scoped></style>
