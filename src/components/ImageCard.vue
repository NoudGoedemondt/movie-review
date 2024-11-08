<template>
  <div @click="goToDetails">
    <img :src="url" :alt="url" class="rounded" />
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';
import { constructImageUrl } from '../api/tmdb';

import defaultAvatar from '@/assets/avatar-default.png';
import defaultImage from '@/assets/image-default.png';

const props = defineProps(['size', 'imgUrl', 'type', 'id']);

const router = useRouter();

const url = computed(() => {
  if (props.imgUrl) {
    return constructImageUrl(props.size, props.imgUrl);
  }

  if (props.type === 'person') {
    return defaultAvatar;
  }

  return defaultImage;
});

const goToDetails = () => {
  router.push(`/details/${props.type}/${props.id}`);
};
</script>
