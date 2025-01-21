<script lang="ts" setup>
  import { Nullable } from 'base-form/src/core/types/common';

  interface BaseListKey {
    title: string;
    key: string;
    sortable?: boolean;
  }

  const props = withDefaults(
    defineProps<{
      title?: string;
      data: Array<unknown>;
      keys: Array<BaseListKey>;
      withNumeration?: boolean;
      mapKey?: (value?: string) => string;
      mapItem?: (value?: string) => Nullable<string>;
      hideFooter?: boolean;
    }>(),
    {
      mapKey: (value?: BaseListKey): BaseListKey => value,
      mapItem: (value?: string) => value
    }
  );

  const items = computed(() => props.data.map(props.mapItem));
  const headers = computed(() => props.keys.map(props.mapKey));
</script>

<template>
  <div>
    <!-- <div>Base List</div> -->
    <div>
      <VDataTable :headers="headers" :items="items" :hide-default-footer="hideFooter">
        <template v-slot:top>
          <VToolbar flat>
            <VToolbarTitle>
              <slot name="title">{{ title }}</slot>
            </VToolbarTitle>
          </VToolbar>
        </template>
      </VDataTable>
    </div>
  </div>
</template>
