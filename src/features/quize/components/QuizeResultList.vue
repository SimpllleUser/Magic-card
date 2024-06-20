<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import VModal from 'src/shared/ui/VModal/_index.vue';
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

  const router = useRouter();
  const MODAL_ID = 'quize-result-modal';
  const TITLE = 'Result of quize !';

  const props = defineProps<Props>();
  const emit = defineEmits<Emit>();

  const COLUMNS = [
    {
      label: '#',
      field: 'index',
      name: 'index',
      align: 'left'
    },
    {
      label: 'From',
      field: 'from',
      name: 'from',
      align: 'left'
    },
    {
      label: 'To',
      field: 'to',
      name: 'to',
      align: 'left'
    },
    {
      name: 'answer',
      field: 'answer',
      required: true,
      label: 'Answer',
      align: 'center'
    }
  ];
  console.log(props.result);
  const rows = computed(() =>
    props.result.map((item, index) => ({
      ...item,
      index: index + 1
    }))
  );

  const resetQuize = () => {
    emit('reset');
  };

  const toHome = () => {
    router.push({ name: 'HomePage' });
  };

  const getIconAnswer = (flag: boolean): string => (flag ? 'check_bold' : 'close');
  const getColorAnswer = (flag: boolean): string => (flag ? 'green' : 'red');
</script>

<template>
  <v-modal :id="MODAL_ID" :title="TITLE">
    <div>
      <div>
        <q-table flat :rows="rows" :columns="COLUMNS">
          <template v-slot:body-cell-to="props">
            <q-td :props="props">
              {{ props.row.to || '-' }}
            </q-td>
          </template>
          <template v-slot:body-cell-answer="props">
            <q-td :props="props">
              <div class="row items-center justify-center">
                <div class="q-pr-sm">
                  <q-icon
                    :color="getColorAnswer(props.row?.isCorrect)"
                    :name="getIconAnswer(props.row?.isCorrect)"
                    style="justify-content: initial"
                  />
                </div>
                <div>
                  {{ props.row.answer }}
                </div>
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="actions row justify-center items-center q-mt-sm">
        <q-btn
          @click="resetQuize"
          label="Try again"
          color="text-dark"
          outline="secondary"
          flat
          class="q-ml-sm btn-cancel border-secondary q-mr-sm"
        />
        <q-btn class="q-ml-md text-black" color="secondary" @click="toHome">To home</q-btn>
      </div>
    </div>
  </v-modal>
</template>
