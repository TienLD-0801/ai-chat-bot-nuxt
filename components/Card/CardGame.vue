<template>
  <div class="card-game">
    <div class="card-game__item" v-for="item in dataGame" :key="item.id">
      <div class="card-game__item__image" @click="handleNavigateGame(item)">
        <img
          width="157"
          height="125"
          loading="lazy"
          :src="item.image"
          alt="No Image"
        />
      </div>
      <div class="card-game__item__title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  dataGame: GameType[];
}>();

const handleNavigateGame = (item: GameType) => {
  navigateTo(item.path);
};
</script>

<style lang="scss" scoped>
.card-game {
  margin-top: 20px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: row;
  gap: 15%;
  justify-content: center;

  &__item {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;

    &__title {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      color: #ffffff;
      line-height: 20px;
    }
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
