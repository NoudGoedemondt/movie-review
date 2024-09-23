<template>
  <div class="trending-people">
    <div class="card-container">
      <ImageCard
        v-for="people in filteredPeopleData"
        :key="people.id"
        :size="'w185'"
        :img-url="people.profile_path"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { fetchTrending } from '../api/tmdb';

import ImageCard from './ImageCard.vue';

const peopleData = ref([]);

const filteredPeopleData = computed(() =>
  peopleData.value.filter((person) => person.profile_path)
);

onMounted(async () => {
  const { results } = await fetchTrending('person', 'day', 1);
  peopleData.value = results;
});
</script>
