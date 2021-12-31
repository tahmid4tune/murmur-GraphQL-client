<template>
  <img class="float-right" src="~static/logout.png" @click="onLogout" />
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    onLogout() {
      ;(this as any).$apolloHelpers.onLogout()
      this.$router.push('/')
    },
  },
})
</script>