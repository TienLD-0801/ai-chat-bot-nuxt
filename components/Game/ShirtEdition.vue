<template>
  <div class="game-shirt">
    <div class="game-shirt__item">
      <video
        ref="videoShirt"
        width="100%"
        height="100%"
        class="game-shirt__video"
        autoplay
        muted
      />
    </div>
    <div class="game-shirt__button-wrapper">
      <div class="game-shirt__button-wrapper__container">
        <p class="game-shirt__button-wrapper__container__title">
          {{ "THERE ARE [3] PEOPLE WEARING [BLACK] SHIRT" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { start, stream } = useCamera();

const videoShirt = ref<HTMLVideoElement>();

watchEffect(() => {
  if (videoShirt.value) {
    videoShirt.value.srcObject = stream.value!;
  }
});

start();
</script>

<style lang="scss">
.game-shirt {
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
