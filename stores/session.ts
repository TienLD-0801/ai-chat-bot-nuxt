// export const useHelmet = defineStore(
//   "session",
//   () => {
//     const result = ref<>({
//       image: "",
//       result: {},
//     });

//     const setResult = (payload: { image: string; result: any }) => {
//       result.value = payload;
//     };

//     const resetValue = () => {
//       result.value = null;
//     };

//     return { result, setResult, resetValue };
//   },
//   {
//     persist: {
//       storage: persistedState.localStorage,
//     },
//   }
// );
