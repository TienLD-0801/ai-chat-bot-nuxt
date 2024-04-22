<template>
  <div class="header">
    <div class="header__image">
      <img loading="lazy" src="~assets/svg/bnk-logo-1.svg" />
    </div>
    <div class="header__text">
      <div>{{ titleHeader }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  titleHeader: string;
}>();
</script>

<style lang="scss">
.header {
  padding: 10px 30px;
  display: flex;
  background: #010028;
  align-items: center;
  justify-content: space-between;

  &__text {
    background: linear-gradient(90deg, #3abf38 0%, #008b90 100%);
    background-clip: text;
    color: transparent;
  }
}
</style>
