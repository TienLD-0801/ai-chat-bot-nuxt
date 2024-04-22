export type DATA_RESPONSE = {
  isSelfie: string;
  isPerson: string;
  listColor: string[];
} & [key: string];

export const useMainStore = defineStore(
  "main",
  () => {
    const data = ref<DATA_RESPONSE | null>(null);
    const setDataMain = (payload: DATA_RESPONSE) => {
      let convertData: { [key: string]: any } = {};
      for (const key in payload) {
        if (HASH_MAIN.has(key)) {
          const mappedKey = HASH_MAIN.get(key);
          if (mappedKey) {
            convertData[mappedKey] = payload[key];
          }
        }
      }
      data.value = convertData as DATA_RESPONSE;
    };

    const resetData = () => {
      data.value = null;
    };

    return { data, setDataMain, resetData };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
