<template>
  <img :src="url" :alt="props.name" />
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { constructImageUrl } from '../api/tmdb';

const props = defineProps(['name', 'overview', 'imgUrl']);

const url = computed(() => constructImageUrl('w154', props.imgUrl));
</script>

<style scoped>
img {
  transition: all 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.1);
}
</style>
