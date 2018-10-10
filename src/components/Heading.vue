<template>
    <div id="header" class="row">
        <div class="col-md-4 d-none d-md-block">
            <logo></logo>
        </div>
        <div class="col-8">
            <span>
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
        border-bottom: 0.25rem solid $primary-4;
        /*-webkit-box-shadow:  0px 0.25rem 0.5rem $primary-4;
        -moz-box-shadow:  0px 0.25rem 0.5rem $primary-4;
        box-shadow:  0px 0.25rem 0.5rem $primary-4;*/
        h1 {
            color: $primary-2;
            font-size: 5rem;
            @media only screen and (min-width : 768px) {
                display: block;
                position: absolute;
                bottom: 1rem;
                right: 7rem;
            }
        }
    }
</style>
