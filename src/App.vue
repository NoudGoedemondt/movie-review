<template>
  <div class="app">
    <img :src="imgUrl" />
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { fetchTrendingMovies, constructImageUrl } from './api/tmdb';

const data = ref(null);

const imgUrl = computed(() =>
  constructImageUrl('w300', '/Asg2UUwipAdE87MxtJy7SQo08XI.jpg')
);

onMounted(async () => {
  data.value = await fetchTrendingMovies('day');
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
