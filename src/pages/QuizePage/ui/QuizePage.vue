<script lang="ts" setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useModulesStore } from 'src/features/Module/store/modules';
  import { PlayQuize } from 'src/features/Quize/play-quize';
  import { getRandomizedArray } from 'src/shared/lib/utils/random';
  import { WordEntity } from 'src/widgets/Words';

  const moduleId = useRoute();
  const modulesStore = useModulesStore();
  const wordList = computed(() =>
    getRandomizedArray<Array<WordEntity>>(modulesStore.getById(moduleId.params.id).words)
  );
</script>

<template>
  <div>
    <div>
      <PlayQuize :words="wordList" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import './styles.scss';
</style>
