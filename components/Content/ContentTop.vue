<template>
  <div class="container">
    <div class="container__image">
      <img loading="lazy" src="~assets/svg/bnk-logo.svg" />
      <img class="container__image__x" loading="lazy" src="~assets/svg/x.svg" />
    </div>
    <img loading="lazy" src="~assets/svg/logo-dark.svg" />
    <div class="container__text">
      <div class="container__text__top">AI AUTOMATON</div>
      <div class="container__text__bottom">Streamline business processes</div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  background: #010028;
  gap: 38px;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;

  &__image {
    display: flex;
    justify-content: center;
    align-items: center;

    &__x {
      margin-bottom: 5px;
      margin-left: 100px;
      position: absolute;
    }
  }

  &__text {
    display: flex;
    gap: 5px;
    flex-direction: column;

    &__top {
      font-weight: 400;
      background: linear-gradient(90deg, #3abf38 0%, #008b90 100%);
      background-clip: text;
      color: transparent;
    }

    &__bottom {
      font-weight: 400;
      color: #ffffff;
      font-size: 16px;
    }
  }
}
</style>
