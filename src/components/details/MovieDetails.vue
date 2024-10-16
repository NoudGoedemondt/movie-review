<template>
  <v-container v-if="loading" class="text-center">Loading...</v-container>
  <v-container v-else class="w-720px mt-5 m-auto border">
    <v-row>
      <v-col>
        <v-img
          :src="posterUrl"
          alt="Movie Poster"
          class="rounded-lg"
          width="154"
        />
      </v-col>

      <v-col>
        <h1 class="font-weight-bold">{{ title }}</h1>
        <v-chip color="primary" dark>{{ releaseDate }}</v-chip>
        <p class="my-4">{{ overview }}</p>
        <div class="d-flex align-center">
          <span class="mr-1">{{ rating.toFixed(1) }}</span>
          <v-rating
            v-model="rating"
            length="10"
            half-increments
            readonly
            color="amber"
            density="compact"
          ></v-rating>
          <span class="ml-1">({{ ratingCount }})</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref, defineProps, computed, watch } from 'vue';
import { fetchDetails, constructImageUrl } from '@/api/tmdb';

const props = defineProps(['id']);

const data = ref(null);
const loading = ref(true);

const title = computed(() => data.value.title);
const overview = computed(() => data.value.overview);
const rating = computed(() => data.value.vote_average);
const ratingCount = computed(() => data.value.vote_count);
const releaseDate = computed(() =>
  new Date(data.value.release_date).toLocaleDateString('en-EN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
);
const posterUrl = computed(() =>
  data.value ? constructImageUrl('w154', data.value.poster_path) : ''
);
// const backdropUrl = computed(() =>
//   data.value ? constructImageUrl('w1280', data.value.backdrop_path) : ''
// );

watch(data, (newValue) => console.log(newValue.release_date));

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
