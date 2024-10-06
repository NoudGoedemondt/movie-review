<template>
  <div class="trending-tv">
    <div class="card-container">
      <ImageCard
        v-for="tv in filteredTvData"
        :key="tv.id"
        :id="tv.id"
        :size="'w185'"
        :img-url="tv.poster_path"
        :type="'tv'"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { fetchTrending } from '../api/tmdb';

import ImageCard from './ImageCard.vue';

const tvData = ref([]);

const filteredTvData = computed(() =>
  tvData.value.filter((show) => show.poster_path)
);

onMounted(async () => {
  const { results } = await fetchTrending('tv', 'day', 1);
  tvData.value = results;
});
</script>
