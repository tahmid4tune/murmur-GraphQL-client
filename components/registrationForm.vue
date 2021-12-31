<template>
  <b-form id="registration-form" @submit="onSubmit" @reset="onReset">
    <b-form-group id="input-group-2" label="Name:" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="form.name"
        placeholder="Enter name"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-3" label="Password:" label-for="input-3">
      <b-form-input
        id="input-3"
        v-model="form.password"
        placeholder="Enter password"
        type="password"
        required
      ></b-form-input>
    </b-form-group>
    <div v-if="registrationError" class="text-danger">
      User already exists with same name.
    </div>
    <div v-if="registrationSuccess" class="text-primary">
      Registration successful. You can login now.
    </div>
    <b-button type="submit" variant="primary"> Submit </b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
    <loading-grow :loading="loading" />
  </b-form>
</template>
<script lang="ts">
import Vue from 'vue'
import loadingGrow from './loadingGrow.vue'
const register = require('~/apollo/mutations/createUser.gql')
export default Vue.extend({
  components: { loadingGrow },
  data() {
    return {
      form: {
        name: '',
        password: '',
      },
      loading: false,
      registrationError: false,
      registrationSuccess: false,
    }
  },
  methods: {
    async onSubmit(event: any) {
      this.loading = true
      event.preventDefault()
      try {
        await (this as any).$apollo.mutate({
          mutation: register,
          variables: {
            createUserInput: {
              name: this.form.name,
              password: this.form.password,
            },
          },
        })
        this.registrationSuccess = true
      } catch (error) {
        this.registrationError = true
      } finally {
        this.loading = false
      }
    },
    onReset(event: any) {
      event.preventDefault()
      this.form.name = ''
      this.form.password = ''
      this.registrationError = false
      this.registrationSuccess = false
    },
  },
})
</script>