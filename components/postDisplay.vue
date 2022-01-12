<template>
  <b-card class="my-2">
    <b-card-title>
      <user-avatar :id="post.author.id" :name="post.author.name" />
      <post-options
        v-if="getLoggedUserId() === post.author.id"
        :post-id="post.id"
      />
    </b-card-title>
    <b-row no-gutters v-if="isPostInEditMode">
      <b-col class="ml-5 mr-3">
        <post-edit :post="post" />
      </b-col>
    </b-row>
    <b-row no-gutters v-else class="ml-5 mb-3">
      <b-col>{{ post.text }}</b-col>
    </b-row>
    <b-row no-gutters class="ml-5 text-secondary">
      <b-col md="2"> Liked by {{ post.likes.length }} </b-col>
      <b-col md="7"></b-col>
      <b-col md="3">
        <span class="float-right">
          {{ getFormattedDateText(post.createdAt) }}
        </span>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button
          v-if="!isLikedByCurrentUser(getLoggedUserId())"
          variant="primary"
          class="mt-4 float-right"
          @click.prevent="likePost"
          >Like</b-button
        >
        <b-button
          v-else
          variant="primary"
          class="mt-4 float-right"
          @click.prevent="unlikePost(getLoggedUserId())"
          >Unlike</b-button
        >
      </b-col>
    </b-row>
  </b-card>
</template>
<script lang="ts">
import Vue from 'vue'
import LoggedUserMixin from '../plugins/LoggedUserMixin'
import DateHelperMixin from '../plugins/DateHelperMixin'
import { Like } from '../store/types'
import postEdit from '~/components/postEdit.vue'
import userAvatar from '~/components/userAvatar.vue'

export default Vue.extend({
  components: { postEdit, userAvatar },
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
  methods: {
    isLikedByCurrentUser(loggedUserId: number): boolean {
      const likeByCurrentUser: Like[] = this.post?.likes?.filter(
        (like: Like) => like.likedBy.id === loggedUserId
      )
      return likeByCurrentUser.length !== 0
    },
    async likePost() {
      await this.$store.dispatch('posts/likePost', this.post.id)
    },
    async unlikePost(loggedUserId: number) {
      await this.$store.dispatch('posts/unlikePost', {
        postId: this.post.id,
        unlikedBy: loggedUserId,
      })
    },
  },
})
</script>