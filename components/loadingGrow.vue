<template>
  <div v-if="loading" :class="floatRight ? 'float-right' : 'float-left'">
    <b-spinner variant="primary" small type="grow"></b-spinner>
    <b-spinner variant="primary" small type="grow"></b-spinner>
    <b-spinner variant="primary" small type="grow"></b-spinner>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    loading: {
      default: false,
      type: Boolean,
    },
    repeatation: {
      default: 3,
      type: Number,
    },
    floatRight: {
      default: true,
      type: Boolean,
    },
  },
})
</script>