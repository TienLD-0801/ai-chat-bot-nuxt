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
  <main class="page-hand-sign">
    <div class="layout">
      <Header titleHeader="REVERSED-JEOPARDY" />
      <HandSign
        @on-click-ready="handleClickReady"
        @on-try-more="handSign.resetValue()"
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
const handSign = useHandSign();
const videoGame = ref<HTMLVideoElement>();
const isShowPopup = ref<boolean>(false);
const isShowReady = ref<boolean>(false);
const canvasElement = ref<HTMLCanvasElement | null>(null);
const numberCountDown = ref<number>(0);
const title = ref("");

const handleClickReady = () => {
  isShowReady.value = true;
};

const handleClickYes = () => {
  isShowReady.value = false;
  isShowPopup.value = true;
  title.value = "Ready go ...";
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
    const { message }: any = await $fetch(API_HANDSIGN, {
      method: "POST",
      body: {
        image: JSON.stringify(imageCapture),
      },
    });
    handSign.setResult(message[HAND_SIGN_RESULT]);
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
.page-hand-sign {
  overflow: hidden;
  background: #eec252;
}

video {
  visibility: hidden;
}
</style>
