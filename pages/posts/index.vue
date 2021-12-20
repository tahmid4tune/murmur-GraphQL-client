<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PostsPage',
  data() {
    return {}
  },
  created() {
    if (!(this as any).$apolloHelpers.getToken()) {
      this.$router.push('/')
    }
  },
  methods: {},
})
</script>
