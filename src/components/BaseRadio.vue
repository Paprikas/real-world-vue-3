<template>
  <input
    type="radio"
    v-bind="$attrs"
    :checked="value === modelValue"
    :value="value"
    @change="$emit('update:modelValue', value)"
    :id="uuid"
  />
  <label :for="uuid" v-if="label">{{ label }}</label>
</template>
<script>
import UniqueID from '@/features/uniqueID'

export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    value: {
      type: [String, Number],
      required: true,
    },
  },
  setup() {
    const uuid = UniqueID().getID()
    return {
      uuid,
    }
  },
}
</script>
