<template>
    <div id="home" class="container">
        <div class="row">
            <div class="col-sm">
                <h2>Hello</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-10 offset-md-2">
                <p>Thanks for stopping by.
                <br/>
                <br/>
                I'm Ben Seager, a full-stack developer based in Norwich</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-10 offset-md-2">
                <p>I'm not wedded to one technology and enjoy using .Net, Node and Go
                    and I have plenty of experience working on all kinds of projects.
                    <br/>
                    <br/>
                Most of my time is spent in the web (both front and back-end),
                    and I've developed a real interest in microservices and
                    serverless architectures.
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-10 offset-md-2">
                <p>Outside of writing code I can be found playing on my
                    PS4 or indulging my unhealthy relationship with
                    Norwich City FC.
                <br/>
                <br/>
                I live in the centre of Norwich with my brilliant wife.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'home',
    };
</script>

<style lang="scss" scoped>
    #home{
        color: $primary-4;
        h2 {
            font-size: 2rem;
        }

        p {
            font-size: 1.5rem;
        }
    }
</style>
