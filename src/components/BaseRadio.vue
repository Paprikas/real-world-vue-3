<template>
  <input
    type="radio"
    v-bind="$attrs"
    :checked="value === modelValue"
    :value="value"
    @change="$emit('update:modelValue', value)"
  />
  <label v-if="label">{{ label }}</label>
</template>
<script>
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
}
</script>
