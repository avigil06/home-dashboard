<template>
  <!-- eslint-disable -->
<div>
  <main>
    <svg
      width="611px"
      height="868px"
      viewBox="0 0 611 868"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="m-auto"
    >
      <image width="611" height="868" href="/img/first_floor.svg" />
      <g
        @click="handleRoomSelection('kitchen')"
        id="Kitchen"
        transform="translate(1.000000, 21.000000)"
        stroke="#979797"
      >
        <path
          d="M169.5,-1.5 L169.5,355.5 L-1.5,355.5 L-1.5,-1.5 L169.5,-1.5 Z"
          id="Floor"
          stroke-width="3"
          fill="#FFF2E4"
          opacity="0"
        ></path>
        <use
          id="Rectangle"
          mask="url(#mask-12)"
          stroke-width="2"
          fill="#FFF2E4"
          stroke-dasharray="4"
          xlink:href="#path-11"
        ></use>
        <use
          id="Rectangle"
          mask="url(#mask-14)"
          stroke-width="2"
          fill="#FFF2E4"
          stroke-dasharray="4"
          xlink:href="#path-13"
        ></use>
        <KitchenPendants :state="kitchenPendants.state || '0'" />
        <KitchenLights :state="kitchenLights.state || 'OFF'" />
      </g>
      <g
        @click="handleRoomSelection('livingroom')"
        id="Living-Room" transform="translate(168.000000, 122.000000)" stroke="#979797">
          <rect id="Rectangle" opacity="0" stroke-width="3" fill="#FFF2E4" x="1.5" y="1.52352941" width="218" height="252.976471"></rect>
          <use id="Combined-Shape" mask="url(#mask-6)" stroke-width="2" fill="#FFF2E4" stroke-dasharray="1,1" xlink:href="#path-5"></use>
          <LivingRoomLights :state="livingRoomLights.state" />
      </g>
    </svg>
  </main>
  <transition name="slide">
    <aside v-show="room.length" class="modal">
      <div class="text-right">
        <button class="c-btn" @click="selectedRoom=''">Close</button>
      </div>
      <ul class="tabs">
        <li class="tab" :class="{ active: paneTab==='item' }" @click="paneTab='item'">
          Items
        </li>
        <li class="tab" :class="{ active: paneTab==='scene' }" @click="paneTab='scene'">
          Scene
        </li>
      </ul>
      <div v-if="paneTab === 'item'" v-for="item in room" :key="`${item.name}_${item.state}`" class="mb-4">
        <Toggle v-if="item.type === 'Switch'" :value="item.state" @input="handleCmd(item.link, $event)">
          {{ item.label }}
        </Toggle>
        <Dimmer v-if="item.type === 'Dimmer'" :value="item.state" @input="handleCmd(item.link, $event)">
          {{ item.label }}
        </Dimmer>
      </div>
      <div v-if="paneTab === 'scene'" class="mb-4">
        <button class="c-btn" @click="triggerScene('moviemode')">
          Move Mode
        </button>
      </div>
    </aside>
  </transition>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import getSmartHome from '@/utilities/smartHome';
import KitchenLights from '@/components/rooms/KitchenLights.vue';
import KitchenPendants from '@/components/rooms/KitchenPendants.vue';
import LivingRoomLights from '@/components/rooms/LivingRoomLights.vue';
import Dimmer from '@/components/Dimmer.vue';
import Toggle from '@/components/Toggle.vue';

const component = defineComponent({
  name: 'FloorPlan',
  components: {
    Dimmer,
    Toggle,
    KitchenLights,
    KitchenPendants,
    LivingRoomLights,
  },
  setup() {
    const paneTab = ref('item');
    const {
      items,
      selectedRoom,
      kitchenLights,
      kitchenPendants,
      livingRoomLights,
      room,
      controls,
      getSmartItems,
      handleCmd,
      triggerScene,
    } = getSmartHome();
    const handleRoomSelection = (r: string) => {
      selectedRoom.value = r;
    };

    onMounted(getSmartItems);

    return {
      paneTab,
      items,
      selectedRoom,
      kitchenLights,
      kitchenPendants,
      livingRoomLights,
      room,
      controls,
      getSmartItems,
      handleCmd,
      handleRoomSelection,
      triggerScene,
    };
  },
});

export default component;
</script>
