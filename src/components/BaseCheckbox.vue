<template>
  <input
    type="checkbox"
    :checked="modelValue"
    v-bind="$attrs"
    @change="$emit('update:modelValue', $event.target.checked)"
    class="field"
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
      type: Boolean,
      default: false,
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
