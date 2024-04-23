<template>
  <div class="game-handsign">
    <div class="game-handsign__item" v-if="!$state.result">
      <div
        class="game-handsign__item__img"
        v-for="item in DATA_HAND_SIGN"
        :key="item.id"
      >
        <img :src="item.image" />
      </div>
    </div>
    <div class="game-handsign__result" v-else>
      <div class="game-handsign__result__img">
        <img :src="convertImage()" width="432" height="432" />
      </div>
    </div>
    <div class="game-handsign__button-wrapper">
      <div
        class="game-handsign__button-wrapper__container"
        @click.stop="!$state.result ? $emit('on-click-ready') : undefined"
      >
        <img
          width="92"
          height="92"
          :src="!$state.result ? 'images/flower.png' : 'images/firework.png'"
        />
        <p class="game-handsign__button-wrapper__container__title">
          {{
            !$state.result
              ? "LET’S POSE A HANDSIGN!"
              : `YOU ARE POSING A [${$state.result}]!`
          }}
        </p>
      </div>
    </div>
    <div
      v-show="$state.result"
      @click="$emit('on-try-more')"
      class="button-play-again"
    >
      Do you want to try more ?
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits(["on-click-ready", "on-try-more"]);
const { $state, resetValue } = useHandSign();

const convertImage = () => {
  switch ($state.result) {
    case "Rock on":
      return "images/i-love-you.png";
    case "Peace":
      return "images/hand.png";
    case "Thumbs up":
      return "images/thumbs-up.png";
    case "OK Hand sign":
      return "images/ok.png";
    case "Flex":
      return "images/burn.png";
    case "Heart":
      return "images/heart.png";
    default:
      return "images/sad.png";
  }
};

onUnmounted(() => {
  resetValue();
});

watchEffect(() => {
  if (!$state.result) return;
});
</script>

<style lang="scss">
.game-handsign {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__item {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    border-radius: 30px;
    margin-top: 70px;
    background-color: #fff;
    border-left: 1px solid #008b90;
    border-top: 1px solid #008b90;

    &__img {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      border-bottom: 1px solid #008b90;
      border-right: 1px solid #008b90;

      &:nth-child(3) {
        border-top-right-radius: 30px;
      }
      &:nth-child(7) {
        border-bottom-left-radius: 30px;
      }
      &:nth-child(9) {
        border-bottom-right-radius: 30px;
      }

      img {
        padding: 25px 10px;
      }
    }
  }

  &__result {
    margin-top: 70px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    background: #ffffff;
    min-width: 538px;
    min-height: 595px;
  }

  &__button-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;

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
        max-width: 230px;
        display: inline;
        font-size: 26px;
        font-weight: 700;
        color: #ffffff;
        white-space: pre-line;
        text-align: center;
      }
    }
  }
}

.button-play-again {
  margin-top: 15px;
  padding: 15px 15px;
  border-radius: 10px;
  background: gray;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
}
</style>
