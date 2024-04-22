<template>
  <div class="control-chat">
    <div class="control-chat__container">
      <img loading="lazy" src="~/assets/svg/microphone.svg" />
      <img loading="lazy" src="~/assets/svg/volume.svg" />
      <img loading="lazy" src="~/assets/svg/reload.svg" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.control-chat {
  position: absolute;
  bottom: 65px;
  right: 35px;

  &__container {
    padding: 0 15px;
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
</style>
