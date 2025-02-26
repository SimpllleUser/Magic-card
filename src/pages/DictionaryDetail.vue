<script setup lang="ts">
  import BaseList from '@/shared/ui/BaseList/BaseList.vue';
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';
  import { useDictionaryStore } from '../stores/dictionary';
  import { DictionaryItem } from '@/core/models/Topic';
  import { Colors, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';

  import {
    ALERT_CONFIG_INSUFFICIENT_QUANTITY_WORDS,
    MIN_WORDS_QUANTITY,
    QUIZE_TYPES_OPTIONS
  } from '@/features/quiz/model/constants';
  import { useNavigation } from '@/features/quiz/model/naigation';

  const keys = [
    {
      title: '#',
      key: 'number',
      sortable: false
    },
    {
      title: 'From',
      key: 'from',
      sortable: false
    },
    {
      title: 'To',
      key: 'to',
      sortable: false
    }
  ];

  const route = useRoute();
  const topicId = computed(() => route.params?.id!);
  const { goToQuize, goToViewMode } = useNavigation();

  const topicsStore = useDictionaryStore();

  const topic = computed(() => topicsStore.getById(topicId.value));

  const mapItem = (item: DictionaryItem, index: number) => ({
    ...item,
    number: index + 1
  });
  const selectedWords = ref([...topic.value?.dictionary]);

  const canPlayQuize = computed(() => selectedWords.value.length >= MIN_WORDS_QUANTITY);
</script>

<template>
  <div class="content-wrapper mx-auto">
    <VRow>
      <VCol>
        <VCard class="py-4" elevation="2">
          <VCardTitle>
            <h3 class="text-h3">{{ topic?.title }}</h3>
          </VCardTitle>
          <VCardSubtitle>
            <p>{{ topic?.description }}</p>
          </VCardSubtitle>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VCard elevation="2">
          <VCardText>
            <AnimationFade style="position: absolute; width: calc(100% - 2rem); margin-right: 20rem">
              <VAlert v-if="!canPlayQuize" v-bind="ALERT_CONFIG_INSUFFICIENT_QUANTITY_WORDS" class="mb-4" />
            </AnimationFade>
            <div class="list-wrapper" :class="{ 'is-alert': !canPlayQuize }">
              <BaseList
                v-model:selected-items="selectedWords"
                :data="topic.dictionary"
                header-title="Dictionary"
                hide-footer
                :keys="keys"
                :map-item="mapItem"
                selectable
              >
                <template #header-actions>
                  <VBtn
                    :append-icon="Icons.File"
                    class="mr-4"
                    :color="Colors.Primary"
                    :disabled="!selectedWords.length"
                    :variant="Variants.Elevated"
                    @click="
                      goToViewMode({
                        topicId: topicId,
                        words: selectedWords
                      })
                    "
                    >View cards</VBtn
                  >
                  <VMenu>
                    <template #activator="{ props }">
                      <VBtn
                        :append-icon="Icons.ChevronDown"
                        :color="Colors.Secondary"
                        :disabled="!canPlayQuize"
                        :variant="Variants.Elevated"
                        v-bind="props"
                        >Play</VBtn
                      >
                    </template>
                    <VList>
                      <VListItem v-for="(item, index) in QUIZE_TYPES_OPTIONS" :key="index" :value="index">
                        <VListItemTitle
                          :class="`text-${Colors.Secondary}`"
                          @click="
                            goToQuize({
                              topicId: topicId,
                              words: selectedWords,
                              type: item.value
                            })
                          "
                          >{{ item.title }}</VListItemTitle
                        >
                      </VListItem>
                    </VList>
                  </VMenu>
                </template>
                <template #empty-text>
                  <div>
                    <p>
                      Let’s add some words
                      <VBtn
                        class="px-1"
                        :color="Colors.Primary"
                        :to="{ name: 'TopicUpdate', params: { id: topicId } }"
                        :variant="Variants.Contained"
                      >
                        go to edit module
                      </VBtn>
                    </p>
                  </div>
                </template>
              </BaseList>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
  .list-wrapper {
    position: relative;
    transition: all 0.3s ease-out;
  }
  .is-alert {
    padding-top: 6rem;
  }
</style>
