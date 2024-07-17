<script lang="ts" setup>
  import { VModal } from 'src/shared/ui/VModal';
  import { computed } from 'vue';
  interface ResultItem {
    id: string;
    word: string;
    isCorrect: boolean;
    answer: string;
  }
  interface Props {
    result: Array<ResultItem>;
  }

  interface Emit {
    (event: 'reset'): void;
  }

  const MODAL_ID = 'quize-result-modal';
  const TITLE = 'Result of quize !';

  const props = defineProps<Props>();
  const emit = defineEmits<Emit>();

  const COLUMNS = [
    {
      label: '#',
      field: 'index',
      align: 'left',
      sortable: true
    },
    {
      label: 'From',
      field: 'from',
      align: 'left',
      sortable: true
    },
    {
      label: 'To',
      field: 'to',
      align: 'left',
      sortable: true
    },
    {
      name: 'answer',
      required: true,
      label: 'Answer',
      align: 'left',
      field: (row: ResultItem) => row.answer,
      sortable: true
    }
  ];

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
  <v-modal :id="MODAL_ID" :title="TITLE">
    <div>
      <div>
        <q-table flat :rows="rows" :columns="COLUMNS" row-key="id" />
      </div>
      <div class="actions row justify-center items-center q-mt-sm">
        <q-btn color="secondary" class="text-black" @click="resetQuize">Try again</q-btn>
        <q-btn class="q-ml-md text-black" color="secondary">To home</q-btn>
      </div>
    </div>
  </v-modal>
</template>
