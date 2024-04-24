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

  console.log(
    "%c Camera is ready !!!",
    "background:#2196F3; color: #FFFFFF; font-size: 20px; font-weight: 800; border-radius: 10px; padding: 2px 0.5em;"
  );

  return { stream, start, stop, isSupported, restart };
};
