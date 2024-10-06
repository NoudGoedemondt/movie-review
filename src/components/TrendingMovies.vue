<template>
  <div class="trending-movies">
    <div class="card-container">
      <ImageCard
        v-for="movie in filteredMovieData"
        :key="movie.id"
        :id="movie.id"
        :size="'w185'"
        :img-url="movie.poster_path"
        :type="'movie'"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { fetchTrending } from '../api/tmdb';

import ImageCard from './ImageCard.vue';

const movieData = ref([]);

const filteredMovieData = computed(() =>
  movieData.value.filter((movie) => movie.poster_path)
);

onMounted(async () => {
  const { results } = await fetchTrending('movie', 'day', 1);
  movieData.value = results;
});
</script>
