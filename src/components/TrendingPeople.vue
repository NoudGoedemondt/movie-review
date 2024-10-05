<template>
  <div class="trending-people">
    <div class="card-container">
      <ImageCard
        v-for="people in peopleData"
        :key="people.id"
        :img-url="people.profile_path"
        :size="'w185'"
        :type="'avatar'"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fetchTrending } from '../api/tmdb';

import ImageCard from './ImageCard.vue';

const peopleData = ref([]);

onMounted(async () => {
  const { results } = await fetchTrending('person', 'day', 1);
  peopleData.value = results;
});
</script>
