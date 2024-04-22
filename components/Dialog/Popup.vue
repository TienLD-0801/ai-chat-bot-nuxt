<template>
  <div class="dialog">
    <div class="dialog__card">
      <div class="dialog__card__title">{{ title }}</div>
      <div
        :class="
          numberCountDown <= 3 ? 'dialog__card__waring' : 'dialog__card__number'
        "
        v-if="numberCountDown !== 0"
      >
        {{ numberCountDown }}
      </div>
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
  position: fixed;
  background: black;
  opacity: 0.8;
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
    padding: 20px 50px;
    gap: 15px;
    position: absolute;
    background: #ffffff;
    border-radius: 10px;
    z-index: 20;
    font-size: 35px;
    font-weight: 800;

    &__number {
      color: blue;
    }

    &__waring {
      color: red;
      animation: zoom 1s infinite;

      @keyframes zoom {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.5);
        }
        100% {
          transform: scale(1);
        }
      }
    }
  }
}
</style>
