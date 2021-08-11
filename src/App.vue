<template>
  <main-page></main-page>
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

<!--<style lang="scss">-->
<!--#app {-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--}-->
<!--</style>-->
