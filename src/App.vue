<template>
  <MainPage></MainPage>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import MainPage from '@/pages/MainPage.vue';

export default defineComponent({
  name: 'App',
  components: {
    MainPage,
  },
});
</script>

<style lang="scss">
html {
  overflow: hidden;
}
#app {
  font-family: "Nunito Sans", sans-serif;
  height: 100vh;
}
</style>
