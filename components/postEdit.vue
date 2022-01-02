<template>
  <b-form @submit="onSubmit">
    <b-form-textarea
      id="post-update"
      v-model="postText"
      placeholder="What's on your mind?"
      rows="3"
    ></b-form-textarea>
    <loading-grow :float-right="false" />
    <b-button
      type="submit"
      variant="primary"
      class="float-right mt-1"
      :disabled="!postText.length || postText === post.text"
    >
      Save
    </b-button>
    <b-button
      type="button"
      variant="danger"
      class="float-right mt-1 mr-1"
      @click="onCancel"
    >
      Cancel
    </b-button>
  </b-form>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['post'],
  data() {
    return {
      postText: this.post.text,
    }
  },
  methods: {
    async onSubmit(event: any) {
      event.preventDefault()
      const action = this.$route?.params?.id
        ? 'users/updatePost'
        : 'posts/updatePost'
      await this.$store.dispatch(action, {
        id: this.post.id,
        text: this.postText,
      })
      this.$store.commit('posts/SET_POST_IN_READ_MODE', this.post.id)
    },
    onCancel() {
      this.$store.commit('posts/SET_POST_IN_READ_MODE', this.post.id)
    },
  },
})
</script>