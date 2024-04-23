export const useGoBack = () => {
  const isAction = ref<boolean>(false);
  const handleDetectAction = (numberStart: number) => {
    let number = numberStart;
    const detectAction = setInterval(() => {
      number--;
      if (isAction.value) {
        console.log("action taken !");
        clearInterval(detectAction);
      }

      if (number === 0) {
        clearInterval(detectAction);
        navigateTo(PATH.MAIN);
      }
      console.log("interval back", number);
    }, 1000);
  };

  return { isAction, handleDetectAction };
};
