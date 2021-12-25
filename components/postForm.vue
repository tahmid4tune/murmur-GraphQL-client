<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-textarea
        id="post-input"
        v-model="postText"
        placeholder="What's in your mind?"
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
const createPost = require('~/apollo/mutations/post.gql')

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
      try {
        const { data } = await (this as any).$apollo.mutate({
          mutation: createPost,
          variables: {
            createPostInput: {
              text: this.postText,
            },
          },
        })
        console.log(data)
      } catch (e) {
      } finally {
        this.reset()
      }
    },
    reset() {
      this.postText = ''
      this.loading = false
    },
  },
})
</script>