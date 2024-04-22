<template>
  <PopupResult
    title="What are you going to do then ?"
    status="Handsign"
    v-show="isShowPopup"
    v-on:on-click-again="handleOnClickAgain"
    v-on:on-click-chat="handleOnClickChat"
  />
  <div class="game-helmet">
    <div class="game-helmet__item">
      <img
        v-if="isCheckAnswer === 1"
        width="100"
        height="100"
        class="game-helmet__item__img"
        src="/images/check-mark.png"
      />
      <img
        v-else-if="isCheckAnswer === 0"
        width="100"
        height="100"
        class="game-helmet__item__img"
        src="/images/check-fail.png"
      />

      <img
        v-else
        width="100"
        height="100"
        class="game-helmet__item__img"
        src="/images/helmet.png"
      />

      <video
        v-if="!resultComputed"
        ref="videoHelmet"
        width="100%"
        height="100%"
        class="game-helmet__video"
        autoplay
      />

      <img
        style="border-radius: 30px"
        width="538"
        height="595"
        :src="resultComputed"
        class="game-helmet__capture"
        v-else
      />
    </div>
    <div class="game-helmet__button-wrapper">
      <div class="game-helmet__button-wrapper__container">
        <p class="game-helmet__button-wrapper__container__title">
          {{ textResult ?? "LET WEAR THE HELMET!" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $state, resetValue } = useHelmet();
const isCheckAnswer = computed(() => {
  if (!$state.result) return;
  const { result } = $state.result;
  return result["s"];
});

const textResult = computed(() => {
  if (!$state.result) return;
  const { result } = $state.result;

  switch (result["s"]) {
    case 0:
      return `SOMETHING NOT RIGHT! ${result["result"]}`;
    case 1:
      return "CONGRATULATION! YOU ARE WEARING YOUR HELMET CORRECTLY";
  }
});

const resultComputed = computed(() => {
  if (!$state.result) return;
  return $state.result.image;
});
const { start, stream } = useCamera();
const isShowPopup = ref(false);
const videoHelmet = ref<HTMLVideoElement>();

const handleOnClickAgain = () => {
  isShowPopup.value = false;
  resetValue();
};

const handleOnClickChat = () => {
  isShowPopup.value = false;
  navigateTo("/ChatBot");
};

const popupCall = () => {
  setTimeout(() => {
    isShowPopup.value = true;
  }, 3000);
};

watch(
  () => $state.result,
  (current, old) => {
    if (current === null) {
      return;
    } else {
      popupCall();
    }
  }
);

onUnmounted(() => {
  isShowPopup.value = false;
  resetValue();
});

watchEffect(() => {
  if (videoHelmet.value) {
    videoHelmet.value.srcObject = stream.value!;
  }
});

// watch(isShowPopup, (current, old) => {
//   if (!old) {
//     setTimeout(() => {
//       navigateTo("/");
//     }, 80000);
//   }
// });

start();
</script>

<style lang="scss">
.game-helmet {
  display: flex;
  justify-content: center;
  align-items: center;

  &__item {
    position: relative;
    margin-top: 70px;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 640px;
    height: 590px;

    &__img {
      position: absolute;
      bottom: 540px;
    }

    video {
      border-radius: 30px;
      object-fit: cover;
    }
  }

  &__button-wrapper {
    width: 100%;
    bottom: 67px;
    position: absolute;
    display: flex;
    justify-content: center;
    height: 138px;

    &__container {
      background: linear-gradient(89.25deg, #3abf38 0.54%, #008b90 99.35%);
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      padding: 23px 26px 17px 35px;

      &__title {
        margin: 0;
        max-width: 350px;
        display: inline;
        font-size: 26px;
        font-weight: 600;
        color: #ffffff;
        white-space: pre-line;
        text-align: center;
      }
    }
  }
}
</style>
