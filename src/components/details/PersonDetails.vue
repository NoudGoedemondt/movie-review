<template>
  <h1>This is the template for person details</h1>
  <pre>
    {{ data }}
  </pre>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue';

import { fetchDetails } from '@/api/tmdb';

const props = defineProps(['id']);

const data = ref(null);

onMounted(async () => (data.value = await fetchDetails(props.id, 'person')));
</script>
