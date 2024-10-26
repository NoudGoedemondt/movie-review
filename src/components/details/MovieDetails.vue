<template>
  <v-container v-if="loading" class="text-center">
    <v-progress-circular indeterminate />
  </v-container>

  <div v-else>
    <!-- backdrop -->
    <v-sheet
      :style="{
        backgroundImage: `url(${backdropUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
      }"
    >
    </v-sheet>

    <v-container
      :style="{
        transform: `translateY(-${posterOverlay})`,
      }"
    >
      <v-row>
        <v-spacer />
        <!-- poster -->
        <v-col cols="2">
          <v-card>
            <v-img
              :src="posterUrl"
              alt="Movie Poster"
              class="rounded"
              aspect-ratio="2/3"
            >
            </v-img>

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

        <!-- details -->
        <v-col cols="8">
          <v-row>
            <div :style="{ height: `${posterOverlay}` }"></div>
          </v-row>
          <v-row>
            <v-card variant="flat">
              <v-card-text>
                <div class="text-h3 font-weight-bold">{{ title }}</div>
                <div v-if="tagline" class="my-4 text-subtitle-1">
                  {{ tagline }}
                </div>

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

                <div class="text-body-1 my-4">
                  {{ overview }}
                </div>
              </v-card-text>

              <v-divider />

              <v-container>
                <v-chip
                  v-for="genre in genres"
                  :key="genre.id"
                  color="primary"
                  class="mr-2"
                  >{{ genre.name }}</v-chip
                >
              </v-container>
            </v-card>
          </v-row>
        </v-col>
        <v-spacer />
      </v-row>

      <!-- recommendations -->
      <v-row>
        <v-spacer />
        <v-col cols="10">
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
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, computed } from 'vue';
import { fetchDetails, fetchRecommended, constructImageUrl } from '@/api/tmdb';
import ImageCard from '../ImageCard.vue';

const posterOverlay = '200px';

const props = defineProps(['id']);

const movieData = ref(null);
const recommendedData = ref(null);
const loading = ref(true);

const backdropUrl = computed(() =>
  movieData.value
    ? constructImageUrl('original', movieData.value.backdrop_path)
    : ''
);

const posterUrl = computed(() =>
  movieData.value ? constructImageUrl('w780', movieData.value.poster_path) : ''
);
const rating = computed(() => movieData.value.vote_average);
const starRating = computed(() => movieData.value.vote_average / 2);
const ratingCount = computed(() => movieData.value.vote_count);
const releaseDate = computed(() =>
  new Date(movieData.value.release_date).toLocaleDateString('en-EN', {
    month: 'short',
    year: 'numeric',
  })
);
const originCountry = computed(() => movieData.value.origin_country);

const title = computed(() => movieData.value.title);
const tagline = computed(() => movieData.value.tagline);
const overview = computed(() => movieData.value.overview);
const genres = computed(() => movieData.value.genres);

onMounted(async () => {
  try {
    movieData.value = await fetchDetails(props.id, 'movie');
    const { results } = await fetchRecommended(props.id, 'movie');
    recommendedData.value = results;
  } catch (error) {
    console.error('Error fething details', error);
  } finally {
    loading.value = false;
  }
});
</script>
