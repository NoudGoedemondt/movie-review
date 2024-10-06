<template>
  <div class="home-view">
    <trending-movies />
    <trending-tv />
    <trending-people />
  </div>
</template>

<script setup>
import TrendingMovies from '../components/TrendingMovies.vue';
import TrendingTv from '../components/TrendingTv.vue';
import TrendingPeople from '../components/TrendingPeople.vue';
</script>
