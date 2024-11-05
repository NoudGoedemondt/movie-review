<template>
  <v-app>
    <!-- app bar -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item @click="goToHome">
          <template v-slot:prepend>
            <v-icon icon="mdi-home"></v-icon>
          </template>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar collapse>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <!-- main content -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const drawer = ref(false);

const goToHome = () => {
  router.push('/');
  drawer.value = false;
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto' sans-serif;
  -webkit-font-smoothing: antialiased;
}

.card-container {
  display: flex;
  gap: 10px;
  overflow: scroll;
}
</style>
