<template>
  <v-card>
    <v-img :src="props.posterUrl" alt="Movie Poster" class="rounded">
      <template v-slot:placeholder>
        <v-row class="fill-height" align="center" justify="center">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-row>
      </template>
      <template v-slot:error>
        <v-row class="fill-height" align="center" justify="center">
          <v-icon icon="mdi-image-off" size="48"></v-icon>
        </v-row>
      </template>
    </v-img>

    <v-card-text v-if="props.originCountry || props.releaseDate">
      <div v-if="props.originCountry" class="d-flex justify-space-between">
        <div class="font-weight-bold">Country:</div>
        <div>
          <span v-for="(country, index) in props.originCountry" :key="country">
            {{ country
            }}{{ index < props.originCountry.length - 1 ? ', ' : '' }}
          </span>
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
    type: String,
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
