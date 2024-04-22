import { useUserMedia } from "@vueuse/core";

export const useCamera = () => {
  const { start, stop, stream, isSupported, restart } = useUserMedia({
    constraints: {
      audio: false,
      video: true,
    },
  });

  if (!isSupported) {
    alert("Camera is not supported");
    stop();
  }

  console.log("Camera is ready !!!");

  return { stream, start, stop, isSupported, restart };
};
