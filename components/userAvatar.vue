<template>
  <div>
    <b-avatar class="mr-1" variant="primary"></b-avatar>
    <span>
      <NuxtLink :to="`/users/${id}`">
        {{ name }}
      </NuxtLink>
    </span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    id: {
      type: Number,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
  },
})
</script>