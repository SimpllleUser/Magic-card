<script lang="ts" setup>
  import { Nullable } from 'base-form/src/core/types/common';

  interface BaseListKey {
    title: string;
    key: string;
    sortable?: boolean;
  }

  const props = withDefaults(
    defineProps<{
      headerTitle?: string;
      selectedItems: string[];
      data: Array<unknown>;
      keys: Array<BaseListKey>;
      withNumeration?: boolean;
      mapKey?: (value?: string) => string;
      mapItem?: (value?: string) => Nullable<string>;
      hideFooter?: boolean;
      selectable?: boolean;
    }>(),
    {
      mapKey: (value?: BaseListKey): BaseListKey => value,
      mapItem: (value?: string) => value
    }
  );

  const emit = defineEmits<{
    (event: 'update:selectedItems', payload: string[]): void;
  }>();

  const selectedIds = ref<Array<unknown>>(props.selectedItems?.map((item) => item.id));
  const items = computed(() => props.data.map(props.mapItem));
  const headers = computed(() => props.keys.map(props.mapKey));

  const onSelectItemOfList = (itemIds: string[]) => {
    const items = props.data.filter((item) => itemIds.includes(item.id));
    emit('update:selectedItems', items);
  };
</script>

<template>
  <div>
    <div>
      <VDataTable
        v-model="selectedIds"
        :headers="headers"
        :items="items"
        :show-select="selectable"
        :hide-default-footer="hideFooter"
        @update:modelValue="onSelectItemOfList"
      >
        <template v-slot:top>
          <VToolbar flat>
            <VToolbarTitle>
              <slot name="header-title">{{ headerTitle }}</slot>
            </VToolbarTitle>
            <slot name="header-actions"></slot>
          </VToolbar>
        </template>
      </VDataTable>
    </div>
  </div>
</template>
