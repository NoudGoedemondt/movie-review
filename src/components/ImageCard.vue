<template>
  <div>
    <img :src="url" :alt="url" />
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { constructImageUrl } from '../api/tmdb';

const props = defineProps(['size', 'imgUrl']);

const url = computed(() => constructImageUrl(props.size, props.imgUrl));
</script>

<style scoped>
img {
  transition: all 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.1);
}
</style>
