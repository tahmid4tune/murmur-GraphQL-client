<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
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
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
const login = require('~/apollo/mutations/login.gql')

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      form: {
        name: '',
        password: '',
      },
    }
  },
  methods: {
    async onSubmit(event: any) {
      event.preventDefault()
      try {
        const { data } = await (this as any).$apollo.mutate({
          mutation: login,
          variables: {
            input: {
              name: this.form.name,
              password: this.form.password,
            },
          },
        })

        await (this as any).$apolloHelpers.onLogin(
          data.login.access_token,
          undefined,
          {
            expires: 7,
          }
        )
      } catch (e) {
        console.error(e)
      }
    },
    onReset(event: any) {
      event.preventDefault()
      this.form.name = ''
      this.form.password = ''
    },
  },
})
</script>
