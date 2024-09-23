<template>
  <div class="app">
    <trending-movies />
    <trending-tv />
    <trending-people />
  </div>
</template>

<script setup>
import TrendingMovies from './components/TrendingMovies.vue';
import TrendingTv from './components/TrendingTv.vue';
import TrendingPeople from './components/TrendingPeople.vue';
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

.card-container {
  display: flex;
  gap: 10px;
  overflow: scroll;
}
</style>
