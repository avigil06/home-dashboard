<template>
  <g
    :opacity="opacity"
    id="Living-Room-Lights" transform="translate(39.000000, 47.000000)" fill="#FFF3A0">
    <circle id="Oval" cx="131" cy="10" r="9.5"></circle>
    <circle id="Oval" cx="10" cy="153" r="9.5"></circle>
    <circle id="Oval" cx="10" cy="10" r="9.5"></circle>
    <circle id="Oval" cx="131" cy="153" r="9.5"></circle>
  </g>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'LvingRoomLights',
  props: {
    state: {
      type: String,
      default: '0',
    },
  },
  setup(props) {
    const opacity = computed(() => Number(props.state) / 100);

    return {
      opacity,
    };
  },
});
</script>
