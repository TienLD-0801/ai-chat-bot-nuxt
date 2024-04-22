<template>
  <div class="dialog">
    <div class="dialog__card">
      <div>{{ title }}</div>
      <div v-if="numberCountDown !== 0">{{ numberCountDown }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  numberCountDown: number;
}>();
</script>

<style lang="scss">
.dialog {
  position: absolute;
  background: black;
  opacity: 0.75;
  height: 100vh;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    position: absolute;
    background: #ffffff;
    color: black;
    border-radius: 10px;
    z-index: 2;
    font-size: 30px;
    font-weight: 800;
  }
}
</style>
