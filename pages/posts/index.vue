<template>
  <div>
    <b-row>
      <b-col md="1" sm="0"></b-col>
      <b-col md="10" sm="12">
        <b-row>
          <b-col>
            <post-form />
          </b-col>
        </b-row>
        <b-row>
          <b-col v-for="post in posts" :key="post.id" md="6" sm="12">
            <post-display :post="post" />
          </b-col>
        </b-row>
      </b-col>
      <b-col md="1" sm="0"></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-pagination
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          align="center"
          @input="getPosts"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
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
      perPage: 10,
    }
  },
  computed: {
    total(): number {
      return this.$store.getters['posts/getTotal']
    },
    currentPage: {
      get(): number {
        return this.$store.getters['posts/getCurrentPage']
      },
      set(value: number) {
        this.$store.commit('posts/SET_CURRENT_PAGE', value)
      },
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
