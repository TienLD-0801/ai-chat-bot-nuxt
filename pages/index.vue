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
<script lang="js" setup>
definePageMeta({
  middleware: "main-guard"
});
const { start, stream, stop } = useCamera();
const { setDataMain, resetData } = useMainStore();
const video = ref();
const canvasElement = ref(null);

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

const fetchAPI = async (imageCapture) => {
  try {
    const urlAPI = "https://demo20.ai.bnksolution.com/welcome/predict";
    const { message } = await $fetch(urlAPI, {
      method: "POST",
      body: {
        image: JSON.stringify(imageCapture),
      },
    });
    setDataMain(message);
  } catch (error) {
    console.log("error ", error);
  }
};


const interValCapture = setInterval(() => {
  captureScreen();
}, 16000);


onUnmounted(() => {
  stop();
  clearInterval(interValCapture);
  resetData();
});

watchEffect(() => {
  start();
  if (video.value) {
    video.value.srcObject = stream.value;
  }
});


// const valueVoice = ref('')

// let recognition = null;

// const toggleTranscription = () => {
//   if (recognition) {
//     // recognition = null;
//   } else {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";
//     recognition.onresult = (event) => {
//       let newTranscript = "";
//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         if (event.results[i].isFinal) {
//           newTranscript += event.results[i][0].transcript;
//           valueVoice.value = newTranscript
//         } else {
//           newTranscript += event.results[i][0].transcript + "...";
//         }
//         // timestamp.value = `Timestamp: ${performance.now()}`;
//       }
//     };
//   }
//   recognition.start();
// };

// watch(valueVoice, ()=> {
//   console.log('change',valueVoice.value);
//     if(valueVoice.value.toLocaleUpperCase().includes('GO TO CHAT')){
//       navigateTo('/ChatBot')
//     }else if (valueVoice.value.toLocaleUpperCase().includes('GO TO HANDSIGN')){
//       console.log('change');
//     }
// })

// watchEffect(()=>{
//   toggleTranscription();
// })
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
