<template>
  <b-card no-body>
    <b-tabs pills card>
      <b-tab title="Sign in" active>
        <login-form />
      </b-tab>
      <b-tab title="Register"><b-card-text>Tab contents 2</b-card-text></b-tab>
    </b-tabs>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
import loginForm from '../components/loginForm.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { loginForm },
  layout: 'loginLayout',

  data() {
    return {}
  },
  methods: {},
})
</script>
