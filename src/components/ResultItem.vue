<script setup lang="ts">
import type { Item } from '@/interfaces/Item';
const props =  defineProps<{item: Item}>();
</script>

<template>
  <div class="item">
    <img :src="'https://image.tmdb.org/t/p/w500/' + props.item.imagePath" alt="image" />
    <h2>{{ props.item.name }}</h2>
    <p>Year: {{ props.item.releaseDate }}</p>
  </div>
</template>

<style scoped>
.item img {
  width: 50%;
  height: auto;
  text-align: center;
}
.item h2,
p {
  margin-top: 10px;
  text-align: center;
}
</style>
