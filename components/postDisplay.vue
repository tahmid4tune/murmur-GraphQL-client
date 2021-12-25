<template>
  <b-card class="my-2">
    <b-card-title>
      <b-avatar class="mr-1" variant="primary"></b-avatar>
      <span>{{ post.author.name }}</span>
      <post-options />
    </b-card-title>
    <b-card-text class="ml-5">{{ post.text }}</b-card-text>
  </b-card>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['post'],
})
</script>