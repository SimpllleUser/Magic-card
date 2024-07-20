<script lang="ts" setup>
  import { computed } from 'vue';
  import { VModal } from 'src/shared/ui/VModal';
  import { COLUMNS, MODAL, ResultItem } from 'src/widgets/Quize/QuizeResultModal';
  interface Props {
    result: Array<ResultItem>;
  }

  interface Emit {
    (event: 'reset'): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emit>();

  const rows = computed(() =>
    props.result.map((item, index) => ({
      ...item,
      index: index + 1
    }))
  );

  const resetQuize = () => {
    emit('reset');
  };
</script>

<template>
  <VModal :id="MODAL.ID" :title="MODAL.TITLE">
    <div>
      <div>
        <q-table flat :rows="rows" :columns="COLUMNS" row-key="id" />
      </div>
      <div class="actions row justify-center items-center q-mt-sm">
        <q-btn color="secondary" class="text-black" @click="resetQuize">Try again</q-btn>
        <q-btn class="q-ml-md text-black" color="secondary">To home</q-btn>
      </div>
    </div>
  </VModal>
</template>
