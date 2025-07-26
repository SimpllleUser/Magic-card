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
      selectedItems?: string[];
      data: Array<unknown>;
      keys: Array<BaseListKey>;
      withNumeration?: boolean;
      mapKey?: (value?: string) => string;
      mapItem?: (value?: string) => Nullable<string>;
      // hideHeader?: boolean;
      height?: string;
      hideFooter?: boolean;
      selectable?: boolean;
      headerSticky?: boolean;
      emptyText?: string;
      colConfig?: { sortable: boolean };
    }>(),
    {
      height: '',
      headerSticky: false,
      mapKey: (value?: BaseListKey): BaseListKey => value,
      mapItem: (value?: string) => value,
      emptyText: 'The list is empty.'
    }
  );

  const emit = defineEmits<{
    (event: 'update:selectedItems', payload: string[]): void;
  }>();

  const selectedIds = ref<Array<unknown>>(props.selectedItems?.map((item) => item.id));
  const items = computed(() => props.data?.map(props.mapItem));
  const headers = computed(() => props.keys?.map(props.mapKey));
  const perPage = computed(() => (props.hideFooter ? items.value.length : 10));
  const onSelectItemOfList = (itemIds: string[]) => {
    const items = props.data.filter((item) => itemIds.includes(item.id));
    emit('update:selectedItems', items);
  };

  const hideHeader = computed(() => !items.value?.length);
</script>

<template>
  <div>
    <div>
      <VDataTable
        v-model="selectedIds"
        v-bind="$slots"
        class="base-list"
        :headers="headers"
        :height="height"
        :hide-default-footer="hideFooter"
        :hide-default-header="hideHeader"
        :items="items"
        :items-per-page="perPage"
        :show-select="selectable"
        :sticky="headerSticky"
        @update:model-value="onSelectItemOfList"
      >
        <template #top>
          <VToolbar v-if="headerTitle && !hideHeader" flat>
            <VToolbarTitle>
              <slot name="header-title">{{ headerTitle }}</slot>
            </VToolbarTitle>
            <slot name="header-actions"></slot>
          </VToolbar>
        </template>
        <template #no-data>
          <slot name="empty-text">{{ emptyText }}</slot>
        </template>
        <template v-for="slotName in Object.keys($slots)" :key="slotName" #[slotName]="props">
          <slot :name="slotName" v-bind="props"></slot>
        </template>
      </VDataTable>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .base-list {
    :deep(.v-selection-control--dirty, .v-selection-control--density-default) {
      color: rgb(var(--v-theme-accent));
    }
  }
</style>
