import { ref, computed } from 'vue';
import {
  smartItems as items,
  getSmartItems,
  sendCommand,
} from '@/utilities/OpenHab';
import { SmartItem } from './OpenHab.d';

const emptySmartItem: SmartItem = {
  editable: false,
  label: '',
  link: '',
  state: '',
  type: '',
  name: '',
  category: '',
  tags: [],
  groupNames: [],
};

const getItem = (itemLabel: string) => () => items
  .value
  .find((item) => item.label === itemLabel) || emptySmartItem;

const scenes = [
  {
    name: 'moviemode',
    mode: 'history',
    on: {
      items: [
        { name: 'tp_livingroom_lights', nextState: '0' },
        { name: 'tp_kitchen_lights', nextState: 'OFF' },
        { name: 'tp_kitchen_pendants', nextState: '15' },
      ],
    },
  },
  {
    name: 'ryleesleep',
    mode: 'toggle',
    on: {
      items: [
        { name: 'tp_rylee_fan', nextState: 'ON' },
        { name: 'tp_rylee_cottonballs', nextState: 'ON' },
        { name: 'tp_rylee_lamp', nextState: 'OFF' },
      ],
    },
    off: {
      items: [
        { name: 'tp_rylee_fan', nextState: 'OFF' },
        { name: 'tp_rylee_cottonballs', nextState: 'OFF' },
        { name: 'tp_rylee_lamp', nextState: 'ON' },
      ],
    },
  },
];

const history: {
  name: string;
  fn: Function;
}[] = [];
const getHistory = (sceneName: string) => history.find((reference) => reference.name === sceneName);

export default () => {
  const selectedRoom = ref('');
  const room = computed(() => {
    if (!selectedRoom.value) return [];
    return items.value.filter((item) => item.name.indexOf(selectedRoom.value) >= 0);
  });
  const controls = computed(() => {
    if (!selectedRoom.value) return [];
    return new Set(room.value.map(({ type }) => type)) || [];
  });

  return {
    items,
    selectedRoom,
    kitchenLights: computed(getItem('Kitchen Lights')),
    kitchenPendants: computed(getItem('Kitchen Pendants')),
    livingRoomLights: computed(getItem('Living Room Lights')),
    room,
    controls,
    getSmartItems,
    handleCmd: async (link: string, nextState: string) => {
      await sendCommand(link, nextState);
      await getSmartItems();
    },
    triggerScene: (sceneName: string) => {
      const scene = scenes.find(({ name }) => name === sceneName);
      if (scene) {
        // const { fn } = getHistory(sceneName);
        scene.on.items.forEach(({ name: sceneItemName, nextState }) => {
          const smartItem = items.value.find((item) => item.name === sceneItemName);
          if (smartItem) {
            sendCommand(smartItem.link, nextState);
          }
        });
      }
    },
  };
};
