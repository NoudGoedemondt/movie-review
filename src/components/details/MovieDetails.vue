<template>
  <v-container v-if="loading" class="text-center">Loading...</v-container>
  <v-container v-else class="w-720px mt-5 m-auto border">
    <v-row>
      <v-col cols="3">
        <v-img :src="posterUrl" alt="Movie Poster" class="rounded-lg" />
        <v-sheet class="d-flex align-center justify-center">
          <span class="mr-1">{{ rating.toFixed(1) }}</span>
          <v-rating
            v-model="starRating"
            length="5"
            color="amber"
            density="compact"
            half-increments
            readonly
          ></v-rating>
          <span class="ml-1">({{ ratingCount }})</span>
        </v-sheet>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="7">
        <h1 class="font-weight-bold">{{ title }}</h1>
        <v-chip color="primary" dark>{{ releaseDate }}</v-chip>
        <p class="my-4">{{ overview }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref, defineProps, computed } from 'vue';
import { fetchDetails, constructImageUrl } from '@/api/tmdb';

const props = defineProps(['id']);

const data = ref(null);
const loading = ref(true);

const title = computed(() => data.value.title);
const overview = computed(() => data.value.overview);
const rating = computed(() => data.value.vote_average);
const starRating = computed(() => data.value.vote_average / 2);
const ratingCount = computed(() => data.value.vote_count);
const releaseDate = computed(() =>
  new Date(data.value.release_date).toLocaleDateString('en-EN', {
    month: 'short',
    year: 'numeric',
  })
);
const posterUrl = computed(() =>
  data.value ? constructImageUrl('w780', data.value.poster_path) : ''
);
// const backdropUrl = computed(() =>
//   data.value ? constructImageUrl('w1280', data.value.backdrop_path) : ''
// );

onMounted(async () => {
  try {
    data.value = await fetchDetails(props.id, 'movie');
  } catch (error) {
    console.error('Error fething details', error);
  } finally {
    loading.value = false;
  }
});
</script>
