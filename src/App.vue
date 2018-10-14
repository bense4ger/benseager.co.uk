<template>
  <div id="app">
    <div class="container-fluid">
      <heading :page-title="pageTitle"></heading>
      <site-menu></site-menu>
      <router-view/>
      <foot></foot>
    </div>
  </div>
</template>

<script>
  import Heading from '@/components/Heading.vue';
  import Menu from '@/components/Menu.vue';
  import Foot from '@/components/Foot.vue';

  export default {
    name: 'app',
    computed: {
      pageTitle() {
        return this.$store.state.currentPage || 'Ben Seager';
      },
    },
    components: {
      heading: Heading,
      siteMenu: Menu,
      foot: Foot,
    },
  };
</script>

<style lang="scss">
  body{
    background-color: $secondary-2-2;
  }
</style>
