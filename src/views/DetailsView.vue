<template>
  <component :is="componentForType" :id="id" />
</template>

<script setup>
import TvDetails from '@/components/details/TvDetails.vue';
import MovieDetails from '@/components/details/MovieDetails.vue';
import PersonDetails from '@/components/details/PersonDetails.vue';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const id = computed(() => route.params.id);
const type = computed(() => route.params.type);

const componentForType = computed(() => {
  switch (type.value) {
    case 'tv':
      return TvDetails;
    case 'movie':
      return MovieDetails;
    case 'person':
      return PersonDetails;
    default:
      return null;
  }
});
</script>
