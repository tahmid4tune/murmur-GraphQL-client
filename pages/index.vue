<template>
  <b-card no-body>
    <b-tabs pills card>
      <b-tab title="Sign in" active>
        <login-form />
      </b-tab>
      <b-tab title="Register">
        <registration-form />
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
import loginForm from '../components/loginForm.vue'
import RegistrationForm from '../components/registrationForm.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { loginForm, RegistrationForm },
  layout: 'loginLayout',

  data() {
    return {}
  },
  methods: {},
})
</script>
