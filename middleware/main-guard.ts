export default defineNuxtRouteMiddleware((to, from) => {
  const mainStore = useMainStore();
  const isCheck = mainStore.data;
});
