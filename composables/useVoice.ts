import { useSpeechRecognition } from "@vueuse/core";

export const useVoice = () => {
  const {
    isSupported,
    isListening,
    isFinal,
    result,
    start: startVoice,
    stop: stopVoice,
  } = useSpeechRecognition();

  if (!isSupported) {
    alert("Micro is not supported");
    stop();
  }

  console.log("Micro is ready !!!!!");

  return { startVoice, stopVoice, isSupported, result };
};
