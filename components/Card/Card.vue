<template>
  <div class="card-chat">
    <div class="card-chat__title">AI Chatbot Nuxt</div>
    <div class="card-chat__title-first">
      Automated Assistant and Business Supporter
    </div>
    <div class="card-chat__wrapper">
      <img src="/assets/svg/arrow-up-right.svg" />
      <div @click="handleGotoChatBot" class="card-chat__wrapper__button">
        Click here to explore
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const handleGotoChatBot = () => {
  navigateTo(PATH.CHAT_BOT);
};
</script>

<style lang="scss" scoped>
.card-chat {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px 11px 10px 11px;
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    rgba(0, 139, 144, 0.4) 0%,
    rgba(58, 191, 56, 0.4) 100%
  );

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
  }

  &__title-first {
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    max-width: 240px;
  }

  &__wrapper {
    cursor: pointer;
    gap: 5px;
    min-height: 44px;
    border-radius: 10px;
    background: #00000099;
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    padding: 0 14px;

    &__button {
      color: #ffffff;
      text-decoration: underline;
    }
  }
}
</style>
