<template>
  <div>
    <img :src="url" :alt="url" />
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { constructImageUrl } from '../api/tmdb';

import defaultAvatar from '@/assets/avatar-default.png';
import defaultImage from '@/assets/image-default.png';

const props = defineProps(['size', 'imgUrl', 'type']);

const url = computed(() => {
  if (props.imgUrl) {
    return constructImageUrl(props.size, props.imgUrl);
  }

  if (props.type === 'person') {
    return defaultAvatar;
  }

  return defaultImage;
});
</script>

<style scoped>
img {
  transition: all 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.1);
}
</style>
