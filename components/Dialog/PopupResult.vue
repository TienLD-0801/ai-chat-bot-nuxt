<template>
  <div class="dialog-result">
    <div class="dialog-result__card">
      <div class="dialog-result__card__title">{{ title }}</div>
      <div class="dialog-result__card__button">
        <div class="dialog-result__card__button__again" @click="$emit('on-click-again')">
          Play Again
        </div>
        <div class="dialog-result__card__button__chat" @click="$emit('on-click-chat')">
          Chat Bot
        </div>
        <div class="dialog-result__card__button__chat">Game {{ status }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
defineProps(['title', 'status'])
defineEmits(["on-click-again", "on-click-chat"]);
const route = useRoute();


// const handleClickNavigateGame = ()=> {
//   console.log('vao day');
//   console.log(route.query.name);
//   if(route.query.name === "REVERSED-JEOPARDY") {
//     console.log('vao day');
//     navigateTo("/Game?name=HARDHAT-HERO")
//   }else {
//     navigateTo("/Game?name=REVERSED-JEOPARDY")
//     console.log('vao day');
//   }
// }
</script>

<style lang="scss">
.dialog-result {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background: black;
  opacity: 0.75;
  height: 100vh;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &__card {
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    position: absolute;
    background: #ffffff;
    border-radius: 10px;
    z-index: 2;

    &__title {
      color: black;
      font-size: 30px;
      font-weight: 800;
    }

    &__button {
      font-size: 25px;
      font-weight: 800;
      display: flex;
      gap: 30px;

      &__again,
      &__chat {
        padding: 10px 20px;
        border-radius: 10px;
        border: 3px solid #008b90;
      }
    }
  }
}
</style>
