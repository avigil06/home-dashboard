import { ref, computed } from 'vue';
import {
  smartItems as items,
  getSmartItems,
  sendCommand,
} from '@/utilities/OpenHab';
import {
  SmartItem,
} from './OpenHab.d';

const emptySmartItem: SmartItem = {
  editable: false,
  label: '',
  link: '',
  state: '',
  type: '',
  name: '',
  category: '',
};

export default () => {
  const selectedRoom = ref('');
  const kitchenLights = computed(() => items.value.find((i) => i.label === 'Kitchen Lights') || emptySmartItem);
  const kitchenPendants = computed(() => items.value.find((i) => i.label === 'Kitchen Pendants') || emptySmartItem);
  const room = computed(() => {
    if (!selectedRoom.value) return [];
    console.log(selectedRoom.value);
    return items.value.filter((item) => item.name.indexOf(selectedRoom.value) >= 0);
  });
  const controls = computed(() => {
    if (!selectedRoom.value) return [];
    return new Set(room.value.map(({ type }) => type)) || [];
  });

  return {
    items,
    selectedRoom,
    kitchenLights,
    kitchenPendants,
    room,
    controls,
    getSmartItems,
    handleCmd: async (link: string, nextState: string) => {
      console.log(link, nextState);
      // await sendCommand(link, nextState);
      // await getSmartItems();
    },
  };
};
