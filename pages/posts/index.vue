<template>
  <b-row>
    <b-col md="1" sm="0"></b-col>
    <b-col md="10" sm="12">
      <b-row>
        <b-col>
          <post-form />
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="(post, index) in posts" :key="post.id" md="6" sm="12">
          {{ index }} {{ post.author.name }} {{ post.text }}
          <post-display />
        </b-col>
      </b-row>
    </b-col>
    <b-col md="1" sm="0"></b-col>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue'
import PostDisplay from '../../components/postDisplay.vue'
import postForm from '../../components/postForm.vue'
import { Post } from '../../store/types'

export default Vue.extend({
  name: 'PostsPage',
  components: { postForm, PostDisplay },
  layout: 'defaultLayout',
  data() {
    return {
      currentPage: 1,
      perPage: 10,
    }
  },
  computed: {
    total(): number {
      return this.$store.getters['posts/getTotal']
    },
    posts(): Post[] {
      return this.$store.getters['posts/getPaginatedPosts']
    },
  },
  async created() {
    if (!(this as any).$apolloHelpers.getToken()) {
      this.$router.push('/')
    }
    await this.getPosts()
  },
  methods: {
    async getPosts() {
      await this.$store.dispatch('posts/getPostsForUser')
    },
  },
})
</script>
