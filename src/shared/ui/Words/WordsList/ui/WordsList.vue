<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { RouteLocationRaw, useRouter } from 'vue-router';
  import { WordEntity } from 'src/widgets/Words';
  import { CHIP_COUNTER_PARAMS } from './constants';

  interface Props {
    moduleId: string;
    words: WordEntity[];
  }

  const props = defineProps<Props>();
  const router = useRouter();

  const getAllWordIds = (): Array<string> => props.words.map((word) => word.id) || [];

  const selectedWords = ref(getAllWordIds());
  const isSelectedAll = ref(true);

  watch(selectedWords, (value) => {
    isSelectedAll.value = value.length === props.words.length;
  });

  const onCheckSelectAll = () => {
    selectedWords.value = isSelectedAll.value ? getAllWordIds() : [];
  };

  const quizeRoute = computed(
    (): RouteLocationRaw => ({
      name: 'QuizePage',
      params: { id: props.moduleId }
    })
  );
  const pushTo = (routeParams: RouteLocationRaw) => {
    router.push(routeParams);
  };
</script>

<template>
  <div>
    <div class="row justify-between q-py-sm">
      <q-chip v-bind="CHIP_COUNTER_PARAMS">
        <b> Selected: </b> <span class="q-ml-sm">{{ selectedWords.length }} / {{ props.words.length }}</span>
      </q-chip>
      <q-btn color="secondary" class="text-black" label="Play" target="" @click="pushTo(quizeRoute)" />
    </div>
    <q-list bordered separator class="words-list">
      <q-item>
        <q-item-section>
          <q-checkbox v-model="isSelectedAll" @update:model-value="onCheckSelectAll" label="All" />
        </q-item-section>
        <q-item-section><b>From</b></q-item-section>
        <q-item-section><b>To</b></q-item-section>
      </q-item>
      <q-item clickable v-for="word in words" :key="word.id">
        <q-item-section> <q-checkbox v-model="selectedWords" :val="word.id" /> </q-item-section>
        <q-item-section>{{ word.from }}</q-item-section>
        <q-item-section>{{ word.to }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style lang="scss" scoped>
  @import './styles';
</style>
