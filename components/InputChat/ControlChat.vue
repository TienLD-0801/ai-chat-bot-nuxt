<template>
  <div class="control-chat">
    <div class="control-chat__container">
      <img
        v-show="isShowIcon"
        loading="lazy"
        src="~/assets/svg/microphone.svg"
        @click="$emit('on-micro')"
      />
      <img
        v-show="!isShowIcon"
        loading="lazy"
        width="25"
        height="25"
        src="/images/microphone-close.png"
        @click="$emit('on-micro')"
      />
      <img loading="lazy" src="~/assets/svg/volume.svg" />
      <img loading="lazy" src="~/assets/svg/reload.svg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ isShowIcon: boolean }>();
defineEmits(["on-micro"]);
</script>

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
