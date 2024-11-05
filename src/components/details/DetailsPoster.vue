<template>
  <v-card>
    <v-img
      :src="props.posterUrl"
      alt="Movie Poster"
      class="rounded"
      aspect-ratio="2/3"
      width="100%"
    >
    </v-img>

    <v-card-text v-if="props.originCountry || props.releaseDate">
      <div v-if="props.originCountry" class="d-flex justify-space-between">
        <div class="font-weight-bold">Country:</div>
        <div>
          <p v-for="(country, index) in props.originCountry" :key="index">
            {{ country }}
          </p>
        </div>
      </div>
      <v-divider
        class="my-1 border-opacity-0"
        v-if="props.originCountry && props.releaseDate"
      />
      <div v-if="props.releaseDate" class="d-flex justify-space-between">
        <div class="font-weight-bold">Released:</div>
        <div>{{ props.releaseDate }}</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  posterUrl: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: false,
    default: null,
  },
  originCountry: {
    type: Array,
    required: false,
    default: null,
  },
});
</script>
