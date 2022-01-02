<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-textarea
        id="post-input"
        v-model="postText"
        placeholder="What's on your mind?"
        rows="3"
      ></b-form-textarea>
      <loading-grow :float-right="false" />
      <b-button
        type="submit"
        variant="primary"
        class="float-right mt-1"
        :disabled="!postText.length"
      >
        Post
      </b-button>
    </b-form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import loadingGrow from './loadingGrow.vue'

export default Vue.extend({
  components: { loadingGrow },
  data() {
    return {
      postText: '',
      loading: false,
    }
  },
  methods: {
    async onSubmit(event: any) {
      this.loading = true
      event.preventDefault()
      await this.$store.dispatch('posts/createPost', this.postText)
      this.reset()
      await this.$store.dispatch('posts/getPostsForUser')
    },
    reset() {
      this.postText = ''
      this.loading = false
    },
  },
})
</script>