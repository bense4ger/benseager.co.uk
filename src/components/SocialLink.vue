<template>
    <a :href="href" target="_blank">
        <font-awesome-icon :icon="iconName" size="2x" class="icon"/>
    </a>
</template>

<script>
    export default {
      name: 'socialLink',
      props: ['href', 'icon'],
      computed: {
        iconName() {
          return ['fab', this.icon];
        },
      },
    };

</script>

<style lang="scss">

</style>
