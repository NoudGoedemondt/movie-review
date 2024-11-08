<template>
  <v-card flat v-if="hasVideos">
    <v-card-title class="text-h5 mb-4">Movie Trailer</v-card-title>
    <div class="container">
      <div
        v-if="loading"
        class="fill-height d-flex align-center justify-center"
      >
        <v-progress-circular indeterminate />
      </div>

      <div>
        <div class="video-wrapper" v-if="videoKey">
          <iframe
            width="100%"
            height="100%"
            :src="`https://www.youtube.com/embed/${videoKey}`"
            allowfullscreen
          >
          </iframe>
        </div>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <template v-slot:prepend>
                <v-icon icon="mdi-chevron-down"></v-icon>
              </template>

              <v-list-item-title>{{ videoName }}</v-list-item-title>
            </v-list-item>
          </template>
          <v-list>
            <v-list-item
              v-for="video in videoData"
              :key="video.id"
              :active="video.id === selectedId"
              @click="selectedId = video.id"
            >
              <v-list-item-title>{{ video.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref, onMounted, defineProps, computed } from 'vue';
import { fetchVideos } from '@/api/tmdb';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const videoData = ref([]);
const selectedId = ref('');
const loading = ref(true);

const videoKey = computed(() => {
  const selectedVideo = videoData.value.find(
    (video) => video.id === selectedId.value
  );
  return selectedVideo?.key;
});

const videoName = computed(() => {
  const selectedVideo = videoData.value.find(
    (video) => video.id === selectedId.value
  );
  return selectedVideo?.name;
});

const hasVideos = computed(() => videoData.value.length > 0);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await fetchVideos(props.id, 'movie');
    videoData.value = response.results;
    selectedId.value = response.results[0].id;
  } catch (error) {
    console.error('Error fetching videos:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.container {
  width: 100%;
}

.video-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
