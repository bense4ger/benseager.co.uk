<template>
    <div id="header" class="row">
        <div class="col-md-4 d-none d-md-block">
            <logo></logo>
        </div>
        <div class="col-8">
            <span class="align-bottom">
                <h1>{{pageTitle}}</h1>
            </span>
        </div>
    </div>
</template>

<script>
    import Logo from './Logo.vue';

    export default {
        name: 'heading',
        props: ['page-title'],
        components: {
          logo: Logo,
        },
    };
</script>

<style lang="scss">
    div#header {
        background-color: $primary-3;
        h1 {
            height: 100%;
            color: $primary-2;
            font-size: 5rem;
            @media only screen and (min-width : 768px) {
                text-align: right;
                margin-top: 8.5rem;
            }
        }
    }
</style>
