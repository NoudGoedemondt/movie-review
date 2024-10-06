<template>
  <h1>These are the details</h1>
  <pre>
    {{ data }}
  </pre>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { fetchDetails } from '@/api/tmdb';

const route = useRoute();

const { id, type } = route.params;

const data = ref(null);

onMounted(async () => (data.value = await fetchDetails(id, type)));
</script>
