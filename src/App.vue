<template>
  <div id="app">
    <div class="container-fluid">
      <heading :page-title="pageTitle"></heading>
      <div id="nav">
        <router-link to="/">Home</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Heading from '@/components/Heading.vue';

  export default {
    name: 'app',
    computed: {
      pageTitle() {
        return this.$store.state.currentPage || 'Ben Seager';
      },
    },
    components: {
      heading: Heading,
    },
  };
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: $primary-0;
      }
    }
  }
</style>
