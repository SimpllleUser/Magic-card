<script setup lang="ts">
  import { computed, ref } from 'vue';
  import VModal from 'components/VModal.vue';
  import VInput from 'components/VInput/VInput.vue';

  import validationRules from 'components/VForm/validationRules';

  const { rules } = validationRules;

  const name = ref('');
  const flag = ref(false);
  const select = ref(3);
  const canShowError = ref(false);

  const getRuleArguments = (ruleKey: string): any => {
    const [rule, paramsInString] = ruleKey?.split(':') || [];
    const paramsInArray = paramsInString?.split(',') || [];
    return { ruleKey: rule, paramsInArray };
  };

  const getRules = (keys: Array<string>): Array<any> =>
    keys.map((key) =>
      canShowError.value
        ? (value: any) => {
            const { ruleKey, paramsInArray } = getRuleArguments(key);
            const params = [value, ...paramsInArray];
            return rules[ruleKey](...params);
          }
        : () => true
    );

  const formData = ref({
    name: {
      value: 'Some name',
      rules: computed(() => getRules(['length: 10']))
    }
  });
  const onSave = () => {
    canShowError.value = true;
  };
  const onsReset = () => {
    canShowError.value = false;
  };
</script>

<template>
  <v-modal id="form-module" title="Module form">
    <div>
      <VInput v-model="formData.name" />
      <q-btn @click="onSave">Save</q-btn>
      <q-btn @click="onsReset">Reset</q-btn>
    </div>
  </v-modal>
</template>

<style scoped></style>
