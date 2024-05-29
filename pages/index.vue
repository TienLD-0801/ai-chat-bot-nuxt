<template>
  <Popup
    :title="title"
    :numberCountDown="numberCountDown"
    v-show="isShowPopup"
  />
  <main class="page-hel-met">
    <div class="layout">
      <Header titleHeader="HARDHAT HER0" />
      <HelMet
        @on-click-ready="handleClickReady"
        @on-try-more="handleActionTryMore"
      />
      <video
        ref="videoGame"
        height="100%"
        width="100%"
        autoplay
        loop
        muted
        playsinline
      >
        <source type="video/mp4" />
        <canvas ref="canvasElement"></canvas>
      </video>
    </div>
  </main>
</template>

<script lang="ts" setup>
const { start, stream } = useCamera();
const videoGame = ref<HTMLVideoElement>();
const isShowPopup = ref<boolean>(false);
const canvasElement = ref<HTMLCanvasElement | null>(null);
const numberCountDown = ref<number>(0);
const title = ref<string>("");
const helmet = useHelmet();

const handleActionTryMore = () => {
  helmet.resetValue();
  navigateTo("/");
};

const handleClickReady = () => {
  isShowPopup.value = true;
  title.value = "Capturing ...";
  countdown(5);
};

const countdown = (number: number) => {
  numberCountDown.value = number;
  const interval = setInterval(() => {
    number--;
    if (number === 0) {
      captureScreen();
      title.value = "Processing ...";
      clearInterval(interval);
    }
    numberCountDown.value = number;
  }, 1000);
};

const captureScreen = () => {
  const video = videoGame.value; // Giá trị video từ phần tử video game
  const canvas = canvasElement.value; // Giá trị canvas từ phần tử canvas

  if (!video || !canvas) {
    console.error("Video hoặc Canvas không hợp lệ.");
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    console.error("Không thể lấy context từ canvas.");
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL("image/png");
  console.log(imageData);

  fetchAPI(imageData.replace("data:image/png;base64,", ""));
};

const fetchAPI = async (imageCapture: string) => {
  try {
    const { message }: any = await $fetch(API_HELMET, {
      method: "POST",
      body: {
        image: JSON.stringify(imageCapture),
      },
    });
    helmet.setResult({
      result: message,
      image: `data:image/png;base64,${imageCapture}`,
    });
  } catch (error) {
    console.log("error ", error);
  } finally {
    isShowPopup.value = false;
  }
};

watchEffect(() => {
  if (videoGame.value) {
    videoGame.value.srcObject = stream.value!;
  }
});

onBeforeMount(() => {
  start();
});
</script>

<style lang="scss" scoped>
.page-hel-met {
  overflow: hidden;
  background: #eec252;
}

video {
  visibility: hidden;
}
</style>
