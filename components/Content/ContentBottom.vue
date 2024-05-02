<template>
  <div class="container">
    <div class="container-wrapper">
      <div class="container-wrapper__image">
        <img loading="lazy" src="~/assets/svg/bnk-logo-1.svg" />
      </div>
      <div class="container-wrapper__road" />
      <div class="container-wrapper__text">
        <div>Website: https://bnksolution.com/</div>
        <div>Hotline: +84 247 301 3318</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  padding: 20px 0;
  background: #010028;
  width: 100%;

  &-wrapper {
    padding: 0 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;

    &__road {
      height: 56px;
      border: 0.01px solid #e3e3e3;
    }

    &__image {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__text {
      color: #ffffff;
      display: flex;
      font-size: 14px;
      font-weight: 400;
      gap: 12px;
      flex-direction: column;
    }
  }
}
</style>
