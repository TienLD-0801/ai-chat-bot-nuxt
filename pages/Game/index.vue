<template>
  <Popup :title="title" :numberCountDown="numberCountDown" v-show="isShowPopup" />
  <main class="main-page">
    <div class="layout">
      <Header
        :titleHeader="
          route.query.name === 'REVERSED-JEOPARDY'
            ? 'REVERSED JEOPARDY'
            : route.query.name === 'CHROMAAI: SHIRT EDITION'
            ? 'CHROMAAI: SHIRT EDITION'
            : 'HARDHAT HERO'
        "
      />
      <HandSign v-if="route.query.name === 'REVERSED-JEOPARDY'" />
      <HelMet v-else-if="route.query.name === 'HARDHAT-HERO'" />
      <ShirtEdition v-else />
      <video ref="videoGame" height="100%" width="100%" autoplay>
        <source type="video/mp4" />
        <canvas ref="canvasElement"></canvas>
      </video>
    </div>
  </main>
</template>

<script lang="ts" setup>
const route = useRoute();
const { start, stream } = useCamera();
const handSign = useHandSign();
const helmet = useHelmet();
const videoGame = ref<HTMLVideoElement>();
const isShowPopup = ref<boolean>(false);
const canvasElement = ref<HTMLCanvasElement | null>(null);
const numberCountDown = ref<number>(5);
const title = ref("Ready go ...");

const countdown = (number: number, url: string) => {
  const interval = setInterval(() => {
    number--;
    if (number === 0) {
      captureScreen(url);
      title.value = "processing ...";
      clearInterval(interval);
    }
    numberCountDown.value = number;
  }, 1000);
};

const captureScreen = (url: string) => {
  if (!videoGame.value || !canvasElement.value) return;
  const canvas = canvasElement.value;
  const context = canvas.getContext("2d");

  if (!context) return;

  canvas.width = videoGame.value.videoWidth;
  canvas.height = videoGame.value.videoHeight;

  context.drawImage(videoGame.value, 0, 0);
  const imageData = canvas.toDataURL("image/png");
  console.log(imageData);
  fetchAPI(imageData.replace("data:image/png;base64,", ""), url);
};

const fetchAPI = async (imageCapture: string, url: string) => {
  try {
    const { message }: any = await $fetch(url, {
      method: "POST",
      body: {
        image: JSON.stringify(imageCapture),
      },
    });

    if (url.includes("handsign")) {
      handSign.setResult(message[HAND_SIGN_RESULT]);
    } else {
      helmet.setResult({
        result: message,
        image: `data:image/png;base64,${imageCapture}`,
      });
    }
  } catch (error) {
    console.log("error ", error);
  } finally {
    isShowPopup.value = false;
  }
};

switch (route.query.name) {
  case "REVERSED-JEOPARDY":
    setTimeout(() => {
      isShowPopup.value = true;
      countdown(5, "https://demo20.ai.bnksolution.com/handsign/predict");
    }, 2500);
    break;
  case "CHROMAAI: SHIRT EDITION":
    break;
  case "HARDHAT-HERO":
    setTimeout(() => {
      isShowPopup.value = true;
      countdown(5, "https://demo20.ai.bnksolution.com/helmet/predict");
    }, 2500);
    break;
  default:
    break;
}

watch(
  () => handSign.$state.result,
  (current, old) => {
    if (current === null) {
      setTimeout(() => {
        isShowPopup.value = true;
        title.value = "Ready go ...";
        numberCountDown.value = 5;
        countdown(5, "https://demo20.ai.bnksolution.com/handsign/predict");
      }, 2000);
    }
  }
);

watch(
  () => helmet.$state.result,
  (current, old) => {
    if (current === null) {
      setTimeout(() => {
        isShowPopup.value = true;
        title.value = "Ready go ...";
        numberCountDown.value = 5;
        countdown(5, "https://demo20.ai.bnksolution.com/helmet/predict");
      }, 2000);
    }
  }
);

watchEffect(() => {
  if (videoGame.value) {
    videoGame.value.srcObject = stream.value!;
  }
});
start();
</script>

<style lang="scss" scoped>
.main-page {
  overflow: hidden;
  background: #eec252;
}

.wrapper-img {
  margin-top: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.transcript {
  font-size: 20px;
  color: #ffffff;
}

video {
  visibility: hidden;
}
</style>
