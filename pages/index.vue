<template>
  <main class="main-page">
    <div class="layout">
      <ContentTop />
      <Wrapper />
      <div class="road">
        Interested in our capabilities, top offers and trends are detail at:
      </div>
      <ContentBottom />
      <video class="video-test" ref="video" height="100%" width="100%" autoplay>
        <source type="video/mp4" />
        <canvas ref="canvasElement"></canvas>
      </video>
    </div>
  </main>
</template>
<script lang="ts" setup>
const { $session_id } = useNuxtApp();
const { start, stream, stop } = useCamera();
const { setDataMain, resetData } = useMainStore();
const video = ref<HTMLVideoElement | null>(null);
const canvasElement = ref<HTMLCanvasElement | null>(null);

const captureScreen = () => {
  if (!video.value || !canvasElement.value) return;

  const canvas = canvasElement.value;
  const context = canvas.getContext("2d");

  if (!context) return;

  canvas.width = video.value.videoWidth;
  canvas.height = video.value.videoHeight;

  context.drawImage(video.value, 0, 0);
  const imageData = canvas.toDataURL("image/png");
  fetchAPI(imageData.replace("data:image/png;base64,", ""));
};

const fetchAPI = async (imageCapture: string) => {
  try {
    const { message } = await $fetch(API_WElCOME, {
      method: "POST",
      body: {
        session_id: $session_id,
        image: JSON.stringify(imageCapture),
      },
    });
    setDataMain(message);
  } catch (error) {
    console.log(
      `%c ${error}`,
      "background:#f44336; color: #FFFFFF; font-size: 20px; font-weight: 800; border-radius: 10px; padding: 2px 0.5em;"
    );
  }
};

const interValCapture = setInterval(() => {
  captureScreen();
}, 14000);

onUnmounted(() => {
  stop();
  clearInterval(interValCapture);
  resetData();
});

onMounted(() => {
  const startTimeOut = setTimeout(() => {
    console.log(
      "%c start time out call api first !!!",
      "background:#2196F3; color: #FFFFFF; font-size: 20px; font-weight: 800; border-radius: 10px; padding: 2px 0.5em;"
    );
    captureScreen();
    clearTimeout(startTimeOut);
  }, 1500);
});

watchEffect(() => {
  start();
  if (video.value) {
    video.value.srcObject = stream.value!;
  }
});
</script>

<style lang="scss" scoped>
.main-page {
  background: #000000;
  display: flex;
  height: 100vh;
}

.layout {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 25px;
  flex-wrap: wrap;
}

.road {
  background: #00cb9b;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
  padding-left: 6px;
}

.video-test {
  visibility: hidden;
}
</style>
