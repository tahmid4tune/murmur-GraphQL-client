<template>
  <b-container>
    <header-background />
    <Nuxt />
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import headerBackground from '../components/headerBackground.vue'

export default Vue.extend({
  name: 'LoginLayout',
  components: { headerBackground },
  data() {
    return {}
  },
  methods: {},
})
</script>
