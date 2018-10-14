<template>
    <div class="row" id="footer">
        <div class="col">
            <p>&copy; Ben Seager {{year}}</p>
        </div>
        <div class="col offset-sm-5 offset-md-7 offset-lg-9">
            <social-link href="https://github.com/bense4ger/" icon="github"></social-link>
            <social-link href="https://twitter.com/digsb" icon="twitter"></social-link>
            <social-link href="https://www.linkedin.com/in/bdseager" icon="linkedin-in"></social-link>
        </div>
    </div>
</template>

<script>
    import SocialLink from '@/components/SocialLink.vue';

    export default {
      name: 'foot',
      components: {
        socialLink: SocialLink,
      },
      computed: {
        year() {
            return new Date().getFullYear();
        },
      },
    };

</script>

<style lang="scss">
    #footer {
        background-color: $primary-2;
        div.col {
            p {
                margin-top: 0.75rem;
            }

            svg.icon {
                margin-top: 0.5rem;
                color: $primary-4;
                margin-left: 1rem;
            }
        }
    }
</style>
