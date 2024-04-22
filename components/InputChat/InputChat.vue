<template>
  <div class="input-chat">
    <div class="input-chat__container">
      <img loading="lazy" src="~/assets/svg/close.svg" @click="navigateTo('/')" />
      <input disabled />
      <img loading="lazy" style="flex: 1" src="~/assets/svg/send.svg" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.input-chat {
  position: absolute;
  bottom: 14px;
  width: 100%;

  &__container {
    padding: 0 15px;
    display: flex;
    align-items: center;
    gap: 5px;

    input {
      color: transparent;
      border: none;
      height: 35px;
      border-radius: 20px;
      background: linear-gradient(90deg, #00cb9b 0%, #008b90 100%);
      width: 100%;
    }
  }
}
</style>
