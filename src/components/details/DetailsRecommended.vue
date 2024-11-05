<template>
  <v-card flat>
    <v-card-title class="text-h5 mb-4">Recommended Movies</v-card-title>
    <v-container class="d-flex overflow-x-auto pa-0">
      <image-card
        v-for="movie in recommendedData"
        :key="movie.id"
        :id="movie.id"
        :size="'w185'"
        :img-url="movie.poster_path"
        :type="'movie'"
        class="mr-5"
      />
    </v-container>
  </v-card>
</template>

<script setup>
import { fetchRecommended } from '@/api/tmdb';
import { onMounted, ref, defineProps } from 'vue';
import ImageCard from '../ImageCard.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const recommendedData = ref([]);

onMounted(async () => {
  const recommendations = await fetchRecommended(props.id, 'movie');
  recommendedData.value = recommendations.results;
});
</script>

<style scoped>
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.5);
  border-radius: 20px;
}
</style>
