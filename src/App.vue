<template>
  <div class="app">
    <movie-card
      v-for="movie in movieData"
      :key="movie.id"
      :name="movie.name"
      :overview="movie.overview"
      :imgUrl="movie.poster_path"
    />
    <pre>
      {{ movieData }}
    </pre>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fetchTrending } from './api/tmdb';

import MovieCard from './components/MovieCard.vue';

const movieData = ref(null);

onMounted(async () => {
  const { results } = await fetchTrending('all', 'day', 1);
  movieData.value = results;
});
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto' sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
