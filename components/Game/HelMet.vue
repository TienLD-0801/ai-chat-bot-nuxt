<template>
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
      <div
        class="game-helmet__button-wrapper__container"
        @click.stop="!textResult ? $emit('on-click-ready') : undefined"
      >
        <img
          v-if="!isCheckAnswer && textResult"
          width="80"
          height="80"
          src="/images/sad.png"
          class="ame-helmet__button-wrapper__container__icon"
        />
        <img
          v-else-if="isCheckAnswer && textResult"
          width="80"
          height="80"
          src="/images/firework.png"
          class="ame-helmet__button-wrapper__container__icon"
        />
        <p
          v-show="textResult"
          :class="
            isCheckAnswer
              ? 'game-helmet__button-wrapper__container__success'
              : 'game-helmet__button-wrapper__container__wrong'
          "
        >
          {{ textResult }}
        </p>
        <p
          v-show="!isCheckAnswer && !textResult"
          class="game-helmet__button-wrapper__container__title"
        >
          {{ "Are you ready ?" }}
        </p>
      </div>
    </div>
    <div
      v-show="textResult"
      @click="$emit('on-try-more')"
      class="button-helmet-again"
    >
      Do you want to try more ?
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits(["on-click-ready", "on-try-more"]);
const { start, stream } = useCamera();
const { $state, resetValue } = useHelmet();
const videoHelmet = ref<HTMLVideoElement>();

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
      return result["result"];
    case 1:
      return result["result"];
  }
});

const resultComputed = computed(() => {
  if (!$state.result) return;
  return $state.result.image;
});

onUnmounted(() => {
  resetValue();
});

watchEffect(() => {
  if (videoHelmet.value) {
    videoHelmet.value.srcObject = stream.value!;
  }
});

onBeforeMount(() => {
  start();
});
</script>

<style lang="scss">
.game-helmet {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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
    margin-top: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 120px;

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

      &__success {
        margin: 0;
        max-width: 350px;
        display: inline;
        font-size: 26px;
        font-weight: 600;
        color: blue;
        white-space: pre-line;
        text-align: center;
      }

      &__wrong {
        margin: 0;
        max-width: 350px;
        display: inline;
        font-size: 26px;
        font-weight: 600;
        color: red;
        white-space: pre-line;
        text-align: center;
      }
    }
  }
}

.button-helmet-again {
  padding: 15px 15px;
  margin-top: 40px;
  border-radius: 10px;
  background: gray;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
}
</style>
