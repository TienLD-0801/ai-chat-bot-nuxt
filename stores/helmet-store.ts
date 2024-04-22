export const useHelmet = defineStore(
  "helmet",
  () => {
    const result = ref<{ image: string; result: any } | null>({
      image: "",
      result: {},
    });

    const setResult = (payload: { image: string; result: any }) => {
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
