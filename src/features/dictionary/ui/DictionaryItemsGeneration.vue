<script setup lang="ts">
import { Colors, Icons, Variants } from "@/core";
import { useDictionaryGeneration } from "@/features/aiMemory/model/useDictionaryGeneration";
import { EmitEvents } from "@/shared";
import { DictionaryItem } from "@/features/dictionary";

defineOptions({ name: 'DictionaryItemsGeneration' });
const props = withDefaults(defineProps<{
  withLabel?: boolean
  disabled?: boolean
  variant?: Variants
  class?: string
  title: string
}>(), {
  class: '',
  variant: Variants.Flat,
  disabled: false,
  withLabel: true
})
const isLoading = false;
const title = computed(() => props.title)
const dictionaryGeneration = useDictionaryGeneration(title)
const disabledClass = computed(() => props.disabled ? 'is-disabled' : '')
const emits = defineEmits<EmitEvents<{
  'generate-success': { description: string; items: DictionaryItem[] }
}>>()
const generationData = async () => {
const { description, items } = await dictionaryGeneration.generate()
  emits('generate-success', { description, items })
}
</script>

<template>
<div>
  <VTooltip text="Generate dictionary data by title" location="top">
    <template #activator="{ props }">
      <VBtn
        v-bind="props"
        class="generation-button d-flex justify-center align-center rounded-sm flex-grow-1"
        :class="`${$attrs.class || ''} ${disabledClass}`"
        :color="Colors.Info"
        :variant="variant"
        style="transition: all 0.5s ease-in-out"
        icon
        @click="!disabled && generationData()"
      >
        <VIcon
          class="d-block"
          :icon="Icons.Creation"
          :size="24"
        />
        <span class="pl-2" v-if="withLabel"> Generate </span>
        <Transition>
          <VProgressCircular
            v-if="isLoading"
            class="ml-2"
            indeterminate
            :size="20"
          />
        </Transition>
      </VBtn>

    </template>
  </VTooltip>
</div>
</template>

<style lang="scss">
  .is-disabled {
    opacity: var(--v-disabled-opacity) !important;
  }
</style>