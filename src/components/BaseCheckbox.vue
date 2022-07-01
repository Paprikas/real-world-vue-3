<template>
  <input
    type="checkbox"
    :checked="modelValue"
    v-bind="$attrs"
    @change="$emit('update:modelValue', $event.target.checked)"
    class="field"
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
      type: Boolean,
      default: false,
    },
  },
}
</script>
