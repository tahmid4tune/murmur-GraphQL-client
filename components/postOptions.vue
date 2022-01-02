<template>
  <div class="float-right">
    <b-dropdown id="dropdown-right" right variant="primary" class="float-right">
      <b-dropdown-item-button :disabled="editState" @click="editClicked">
        Edit
      </b-dropdown-item-button>
      <b-dropdown-item-button v-b-modal="`delete-modal-${postId}`"
        >Delete</b-dropdown-item-button
      >
    </b-dropdown>
    <b-modal
      :id="`delete-modal-${postId}`"
      hide-header
      centered
      @ok="handleDelete"
    >
      <p class="my-4">Are you sure to delete the post?</p>
    </b-modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    postId: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {}
  },
  computed: {
    editState(): boolean {
      const editModePostIds: number[] =
        this.$store.getters['posts/getPostsInEditMode']
      return !!editModePostIds.filter(
        (editPostId) => editPostId === this.postId
      ).length
    },
  },
  methods: {
    editClicked() {
      this.$store.commit('posts/SET_POST_IN_EDIT_MODE', this.postId)
    },
    async handleDelete() {
      await this.$store.dispatch('posts/deletePost', this.postId)
      if (this.$route?.params?.id) {
        await this.$store.dispatch(
          'users/getPostsByUser',
          this?.$route?.params?.id
        )
      } else {
        await this.$store.dispatch('posts/getPostsForUser')
      }
    },
  },
})
</script>