<template>
  <div>
    <b-row>
      <b-col md="1" sm="0"></b-col>
      <b-col md="5" sm="12">
        <b-row v-if="$route.params.id == getLoggedUserId()">
          <b-col class="my-2">
            <post-form />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <follow-stats />
          </b-col>
        </b-row>
      </b-col>
      <b-col md="5" sm="12">
        <b-row v-for="post in posts" :key="post.id">
          <b-col>
            <post-display :post="post" />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-pagination
              v-if="totalPostsByUser"
              v-model="currentPostPage"
              :total-rows="totalPostsByUser"
              :per-page="perPage"
              align="center"
              @input="getPostsByUser"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="1" sm="0"></b-col>
    </b-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import FollowStats from '../../components/followStats.vue'
import postForm from '../../components/postForm.vue'
import LoggedUserMixin from '../../plugins/LoggedUserMixin'
export default Vue.extend({
  name: 'UserPage',
  components: { postForm, FollowStats },
  mixins: [LoggedUserMixin],
  layout: 'defaultLayout',
  data() {
    return {
      perPage: 10,
    }
  },
  computed: {
    totalPostsByUser(): number {
      return this.$store.getters['users/getTotalPostsByUser']
    },
    currentPostPage: {
      get(): number {
        return this.$store.getters['users/getCurrentPostPage']
      },
      set(value: number) {
        this.$store.commit('users/SET_CURRENT_POST_PAGE', value)
      },
    },
    posts() {
      return this.$store.getters['users/getUserPostsOnThisPage']
    },
  },
  async created() {
    if (!(this as any).$apolloHelpers.getToken()) {
      this.$router.push('/')
    }
    await this.getPostsByUser()
  },
  methods: {
    async getPostsByUser() {
      await this.$store.dispatch(
        'users/getPostsByUser',
        this?.$route?.params?.id
      )
    },
  },
})
</script>