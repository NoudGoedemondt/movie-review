<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

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
