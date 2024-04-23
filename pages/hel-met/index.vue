<template>
  <Popup
    :title="title"
    :numberCountDown="numberCountDown"
    v-show="isShowPopup"
  />
  <PopupReady
    title="Are You Ready ?"
    @on-click-yes="handleClickYes"
    v-show="isShowReady"
  />
  <main class="page-hel-met">
    <div class="layout">
      <Header titleHeader="HARDHAT HER0" />
      <HelMet
        @on-click-ready="handleClickReady"
        @on-try-more="handleActionTryMore"
      />
      <video ref="videoGame" height="100%" width="100%" autoplay>
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
const isShowReady = ref<boolean>(false);
const canvasElement = ref<HTMLCanvasElement | null>(null);
const numberCountDown = ref<number>(0);
const title = ref("");
const helmet = useHelmet();
const { isAction, handleDetectAction } = useGoBack();

const handleActionTryMore = () => {
  isAction.value = true;
  helmet.resetValue();
};

const handleClickReady = () => {
  isShowReady.value = true;
};

const handleClickYes = () => {
  isShowReady.value = false;
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
  if (!videoGame.value || !canvasElement.value) return;
  const canvas = canvasElement.value;
  const context = canvas.getContext("2d");

  if (!context) return;

  canvas.width = videoGame.value.videoWidth;
  canvas.height = videoGame.value.videoHeight;

  context.drawImage(videoGame.value, 0, 0);
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
    handleDetectAction(TIME_OUT_BACK);
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
