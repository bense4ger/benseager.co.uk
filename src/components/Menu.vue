<template>
    <div class="row">
        <div class="col-sm">
            <div id="menu">
                <b-navbar toggleable="lg">
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

<style>

</style>
