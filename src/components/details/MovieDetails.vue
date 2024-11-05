<template>
  <v-container
    v-if="loading"
    class="text-center fill-height d-flex align-center justify-center"
  >
    <v-progress-circular indeterminate />
  </v-container>

  <div v-else>
    <!-- backdrop -->
    <v-sheet
      class="backdrop"
      :style="{
        backgroundImage: `url(${backdropUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        height: '100vh',
        'z-index': '0',
      }"
    >
    </v-sheet>

    <!-- main content -->
    <v-container
      class="position-relative"
      style="margin-top: 300px; z-index: 1"
    >
      <v-sheet rounded class="py-10">
        <v-row>
          <v-spacer />
          <!-- poster -->
          <v-col cols="2">
            <details-poster
              :poster-url="posterUrl"
              :origin-country="originCountry"
              :release-date="releaseDate"
              style="
                position: absolute;
                z-index: 10;
                transform: translateY(-200px);
              "
            />
          </v-col>

          <!-- details -->
          <v-col cols="6">
            <v-row>
              <v-card variant="flat">
                <v-card-text>
                  <div class="mb-4 text-h3 font-weight-bold">{{ title }}</div>
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
                <v-divider />
              </v-card>
            </v-row>
          </v-col>
          <v-spacer />
        </v-row>

        <!-- recommendations -->
        <v-row>
          <v-spacer />
          <v-col cols="8">
            <details-recommended :id="props.id" />
          </v-col>
          <v-spacer />
        </v-row>
      </v-sheet>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, computed, watch } from 'vue';
import { fetchDetails, constructImageUrl } from '@/api/tmdb';
import DetailsPoster from './DetailsPoster.vue';
import DetailsRecommended from './DetailsRecommended.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const movieData = ref(null);
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

const fetchMovieData = async (id) => {
  loading.value = true;
  try {
    const details = await fetchDetails(id, 'movie');
    movieData.value = details;
  } catch (error) {
    console.error('Error fetching details:', error);
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.id,
  (newId) => {
    if (newId) {
      fetchMovieData(newId);
    }
  },
  { immediate: true }
);

onMounted(() => fetchMovieData(props.id));
</script>

<style scoped>
.backdrop {
  animation: fadeIn ease 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
