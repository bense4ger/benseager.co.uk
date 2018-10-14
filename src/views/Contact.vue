<template>
    <!-- eslint-disable -->
    <div id="contact" class="container">
        <div class="row">
            <div class="col-sm">
                <h2>Contact</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-10 offset-md-2">
                <p>If you'd like to get in touch, feel free to drop me a line using the form below.</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-10 offset-md-2">
                <b-form action="https://submit-form.com/0a33497e-f1a4-4b04-86f8-295c7f5899de" @reset="resetForm">
                    <b-form-checkbox id="honeypot" name="_honeypot" autocomplete="off" tabindex="-1" style="display: none;"></b-form-checkbox>
                    <input id="redirect" type="hidden" name="_redirect" value="https://benseager.co.uk/#/thanks" />
                    <b-form-group id="name-group" label="Name" label-for="name">
                        <b-form-input id="name" name="name" type="text" required v-model="form.name"></b-form-input>
                    </b-form-group>
                    <b-form-group id="email-group" label="Email" label-for="email" description="This won't be shared with anyone">
                        <b-form-input id="email" name="email" type="email" required v-model="form.email"></b-form-input>
                    </b-form-group>
                    <b-form-group id="message-group" label="Your Message" label-for="message">
                        <b-form-textarea id="message" name="message" :rows="3" :max-rows="6" v-model="form.message"></b-form-textarea>
                    </b-form-group>
                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="secondary">Reset</b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'contact',
      data() {
        return {
          form: {
            name: '',
            email: '',
            message: '',
          },
        };
      },
      methods: {
        resetForm(evt) {
            evt.preventDefault();
            this.form.name = '';
            this.form.email = '';
            this.form.message = '';
        },
      },
    };
</script>

<style lang="scss" scoped>
    button {
        margin-bottom: 2rem;
        background-color: $primary-3 !important;
        border: none;
        &[type="submit"] {
            margin-right: 2rem;
        }
    }
</style>
