<template>
  <div class="dialog-ready">
    <div class="dialog-ready__card">
      <div>{{ title }}</div>
      <div class="dialog-ready__card__button" @click="$emit('on-click-yes')">
        YES
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits(["on-click-yes"]);
defineProps<{
  title: string;
}>();
</script>

<style lang="scss">
.dialog-ready {
  position: fixed;
  background: black;
  opacity: 0.85;
  height: 100vh;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px;
    position: absolute;
    background: #ffffff;
    border-radius: 10px;
    z-index: 20;
    gap: 15px;
    font-size: 30px;
    font-weight: 800;

    &__button {
      font-size: 25px;
      padding: 10px 20px;
      border-radius: 10px;
      color: #fff;
      background: linear-gradient(89.25deg, #3abf38 0.54%, #008b90 99.35%);
    }
  }
}
</style>
