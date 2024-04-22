<template>
  <div class="wrapper">
    <div class="wrapper__container">
      <div class="wrapper__title">LET’s TRY OUR CHATBOT:</div>
      <div class="wrapper__content">
        <div class="wrapper__content__stream">
          <video
            class="wrapper__content__stream__default"
            src="https://hannover1.korenext.com/video/no_sound_extcrop.mp4"
            name="test"
            height="400"
            width="300"
            autoplay
            :loop="!!videoURL"
          ></video>
          <video
            class="wrapper__content__stream__real"
            :src="videoURL"
            name="test"
            height="400"
            width="300"
            autoplay
            :loop="!!videoURL"
          ></video>
        </div>
        <Card />
      </div>
      <div class="wrapper__title">FOR ENTERTAINING, WE HAVE SOME GAMES:</div>
      <CardGame :dataGame="DATA_GAME" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const { ws } = useSocket();
const videoURL = ref<string>("https://hannover1.korenext.com/video/no_sound_extcrop.mp4");

onMounted(() => {
  ws.onmessage = (evt) => {
    videoURL.value = evt.data as string;
  };
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 30px 20px 0px 20px;
  background-image: url("public/images/wallpaper.png");
  background-repeat: round;
  flex: 1;

  &__title {
    font-weight: 600;
    line-height: 20px;
    font-size: 18px;
    color: #ffffff;
  }

  &__content {
    margin: 18px 0;
    width: 100%;
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    &__stream {
      position: relative;
      display: flex;

      &__default {
        z-index: 1;
      }

      &__real {
        position: absolute;
        z-index: 2;
      }
    }

    video {
      max-height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }
  }
}
</style>
