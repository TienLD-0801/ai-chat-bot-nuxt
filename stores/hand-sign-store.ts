export const useHandSign = defineStore(
  "hand-sign",
  () => {
    const result = ref<string | null>(null);
    const setResult = (payload: string) => {
      result.value = payload;
    };

    const resetValue = () => {
      result.value = null;
    };

    return { result, setResult, resetValue };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
