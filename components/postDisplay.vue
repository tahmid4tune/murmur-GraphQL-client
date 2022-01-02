<template>
  <b-card class="my-2">
    <b-card-title>
      <b-avatar class="mr-1" variant="primary"></b-avatar>
      <span>{{ post.author.name }}</span>
      <post-options
        v-if="getLoggedUserId() === post.author.id"
        :post-id="post.id"
      />
    </b-card-title>
    <div v-if="isPostInEditMode">
      <post-edit :post="post" />
    </div>
    <b-card-text v-else class="ml-5">{{ post.text }}</b-card-text>
    <b-card-text class="ml-5 text-secondary float-right">{{
      getFormattedDateText(post.createdAt)
    }}</b-card-text>
  </b-card>
</template>
<script lang="ts">
import Vue from 'vue'
import LoggedUserMixin from '../plugins/LoggedUserMixin'
import DateHelperMixin from '../plugins/DateHelperMixin'
import postEdit from './postEdit.vue'

export default Vue.extend({
  components: { postEdit },
  mixins: [LoggedUserMixin, DateHelperMixin],
  props: ['post'],
  computed: {
    isPostInEditMode(): boolean {
      const editModePostList: number[] =
        this.$store.getters['posts/getPostsInEditMode']
      return !!editModePostList.filter(
        (editPostId) => editPostId === this.post.id
      )?.length
    },
  },
})
</script>