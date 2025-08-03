<script setup lang="ts">
  import { Colors, Variants } from '@/core/models/enums';
  import { downloadFile, exportFormats, FileExtension, FileFormat } from './index';
  import { Icons } from '@/core/models/icons';
  interface Props {
    title: string;
    data: any;
    isMobile?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    title: 'File Export',
    data: {}
  });

  interface ExportFormat {
    id: FileExtension;
    title: string;
    mime: FileFormat;
    extension: string;
    action: CallableFunction;
  }

  const onSectExportFormat = (value: ExportFormat) => {
    downloadFile(props.title, value.action(props.data), value.id);
  };
</script>
<template>
  <VBtn
    activator="parent"
    :color="Colors.Primary"
    :variant="Variants.Outlined"
  >
    <div v-if="!isMobile">
      <span> Export </span>
      <VIcon :icon="Icons.ChevronDown" />
    </div>
    <span v-if="isMobile">
      <VIcon :icon="Icons.Download" />
    </span>

    <VMenu activator="parent">
      <VList>
        <VListItem
          v-for="(item, index) in exportFormats"
          :key="index"
          :value="index"
        >
          <VListItemTitle @click="onSectExportFormat(item)">{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </VBtn>
</template>
