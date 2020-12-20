<template>
  <div class="toggle">
    <label>
      <slot />
    </label>
    <div
      @click="$emit('input', value === 'ON' ? 'OFF' : 'ON')"
      :class="enabled ? 'active' : ''"
      class="toggle-control"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Toggle',
  props: {
    value: {
      type: String,
    },
  },
  setup(props) {
    const enabled = computed(() => props.value === 'ON');

    return {
      enabled,
    };
  },
});
</script>
