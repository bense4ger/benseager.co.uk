<template>
    <div class="row nav-wrapper">
        <div class="col-sm">
            <div id="menu">
                <b-navbar toggleable="md">
                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                    <b-collapse is-nav id="nav-collapse">
                        <b-navbar-nav>
                            <b-nav-item to="/">Home</b-nav-item>
                        </b-navbar-nav>
                    </b-collapse>
                </b-navbar>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'siteMenu',
    };
</script>

<style lang="scss">
    div.nav-wrapper {
        background-color: $secondary-1-4;
        nav {
            button {
                background-color: $secondary-1-1;
            }
            ul.navbar-nav {
                li.nav-item {
                    display: block;
                    a.nav-link {
                        &.active {
                            color: $primary-2 !important;
                        }
                        color: $secondary-1-1 !important;
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>
