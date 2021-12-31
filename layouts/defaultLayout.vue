<template>
  <div>
    <header-mini />
    <b-container fluid class="pt-4">
      <Nuxt />
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import headerMini from '../components/headerMini.vue'

export default Vue.extend({
  components: { headerMini },
  name: 'LoginLayout',
  data() {
    return {}
  },
  methods: {},
})
</script>
