<template>
  <div class="dimmer">
    <label>
      <slot /> <span class="font-bold">{{ value }}%</span>
      <template v-if="dragging">
        &nbsp;to <span class="font-bold">{{ round(nextPosition) }}%</span>
      </template>
    </label>
    <div class="dimmer-control-container">
      <div class="dimmer-control" @mousedown="dragStart">
        <div class="dimmer-switch" :style="`left: ${nextPosition}%`" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onUnmounted,
} from 'vue';

export default defineComponent({
  name: 'Dimmer',
  props: {
    value: {
      type: String,
    },
  },
  setup(props, context) {
    const dragging = ref(false);
    const nextPosition = ref(Number(props.value));
    const handleMouseMovement = (event: MouseEvent) => {
      nextPosition.value = Number(nextPosition.value) + (Number(event.movementX) * 0.5);

      if (nextPosition.value < 0) {
        nextPosition.value = 0;
      }

      if (nextPosition.value > 100) {
        nextPosition.value = 100;
      }
    };

    onUnmounted(() => {
      // eslint-disable-next-line
      document.removeEventListener('mouseup', dragEnd);
    });

    function dragStart() {
      dragging.value = true;
      document.addEventListener('mousemove', handleMouseMovement);
      // eslint-disable-next-line
      document.addEventListener('mouseup', dragEnd);
    }

    function dragEnd() {
      document.removeEventListener('mouseup', dragEnd);
      document.removeEventListener('mousemove', handleMouseMovement);
      context.emit('input', Math.round(nextPosition.value));
      dragging.value = false;
    }

    return {
      dragging,
      nextPosition,
      dragStart,
      dragEnd,
      round: Math.round,
    };
  },
});
</script>
