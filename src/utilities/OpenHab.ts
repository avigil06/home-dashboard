import { ref } from 'vue';
import {
  SmartItem,
} from './OpenHab.d';

const getItems = (): Promise<SmartItem[]> => fetch('/rest/items')
  .then((response) => response.json())
  .catch(() => ([] as SmartItem[]));

export const sendCommand = (link: string, body: string) => fetch(link, {
  method: 'POST',
  body,
});

export const smartItems = ref<SmartItem[]>([]);

export const getSmartItems = async () => {
  const items = await getItems();
  smartItems.value = items;
};
