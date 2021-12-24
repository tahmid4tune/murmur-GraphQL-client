<template>
  <div>
    <b-row>
      <b-col md="1" sm="0"> </b-col>
      <b-col md="10" sm="12">
        <post-form />
      </b-col>
      <b-col md="1" sm="0"> </b-col>
    </b-row>
    <b-row>
      <b-col md="6" sm="12"></b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import postForm from '../../components/postForm.vue'
export default Vue.extend({
  name: 'PostsPage',
  components: { postForm },
  layout: 'defaultLayout',
  created() {
    if (!(this as any).$apolloHelpers.getToken()) {
      this.$router.push('/')
    }
  },
  methods: {},
})
</script>
