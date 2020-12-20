<template>
  <g
    id="Kitchen-Lights"
    transform="translate(47.000000, 141.000000)"
    fill="#FFF3A0"
    v-show="state === 'ON'"
  >
    <circle id="Oval" cx="10" cy="10" r="9.5"></circle>
    <circle id="Oval" cx="91" cy="10" r="9.5"></circle>
    <circle id="Oval" cx="10" cy="87" r="9.5"></circle>
    <circle id="Oval" cx="91" cy="87" r="9.5"></circle>
    <circle id="Oval" cx="10" cy="160" r="9.5"></circle>
    <circle id="Oval" cx="91" cy="160" r="9.5"></circle>
  </g>
</template>

<script>
export default {
  name: 'KitchenLights',
  props: {
    state: {
      type: String,
      default: 'OFF',
    },
  },
};
</script>
