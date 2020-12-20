<template>
  <g
    id="Kitchen-Pendants"
    transform="translate(97.000000, 181.000000)"
    fill="#FFF3A0"
    :opacity="opacity"
  >
    <circle id="Oval" cx="10" cy="10" r="9.5"></circle>
    <circle id="Oval" cx="10" cy="80" r="9.5"></circle>
  </g>
</template>

<script>
export default {
  name: 'KitchenPendants',
  props: {
    state: {
      type: String,
      default: '0',
    },
  },
  computed: {
    opacity() {
      return Number(this.state) / 100;
    },
  },
};
</script>
