<template>
  <v-container v-if="loading" class="text-center">Loading...</v-container>
  <div v-else>
    <v-sheet
      :style="{
        backgroundImage: `url(${backdropUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
      }"
    >
    </v-sheet>

    <v-container>
      <v-row>
        <v-spacer />
        <v-col cols="3">
          <v-card
            max-width="280"
            :style="{
              transform: 'translateY(-200px)',
            }"
          >
            <v-img :src="posterUrl" alt="Movie Poster" />

            <v-card-text>
              <div class="d-flex justify-space-between">
                <div class="font-weight-bold">Country:</div>
                <div>
                  <p v-for="(country, index) in originCountry" :key="index">
                    {{ country }}
                  </p>
                </div>
              </div>
              <div class="mt-2 d-flex justify-space-between">
                <div class="font-weight-bold">Released:</div>
                <div>{{ releaseDate }}</div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="5">
          <v-card variant="flat">
            <v-card-text>
              <div class="text-h3 font-weight-bold">{{ title }}</div>
              <div class="my-4 text-subtitle-1">{{ tagline }}</div>
              <div class="d-flex align-center">
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
              </div>
              <div class="my-4">{{ overview }}</div>
              <v-chip
                v-for="genre in genres"
                :key="genre.id"
                color="primary"
                class="mr-1"
                >{{ genre.name }}</v-chip
              >
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, computed } from 'vue';
import { fetchDetails, constructImageUrl } from '@/api/tmdb';

const props = defineProps(['id']);

const data = ref(null);
const loading = ref(true);

const backdropUrl = computed(() =>
  data.value ? constructImageUrl('original', data.value.backdrop_path) : ''
);

const posterUrl = computed(() =>
  data.value ? constructImageUrl('w780', data.value.poster_path) : ''
);
const rating = computed(() => data.value.vote_average);
const starRating = computed(() => data.value.vote_average / 2);
const ratingCount = computed(() => data.value.vote_count);
const releaseDate = computed(() =>
  new Date(data.value.release_date).toLocaleDateString('en-EN', {
    month: 'short',
    year: 'numeric',
  })
);
const originCountry = computed(() => data.value.origin_country);

const title = computed(() => data.value.title);
const tagline = computed(() => data.value.tagline);
const overview = computed(() => data.value.overview);
const genres = computed(() => data.value.genres);

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
