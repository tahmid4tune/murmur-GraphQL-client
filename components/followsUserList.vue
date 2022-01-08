<template>
  <div>
    <b-card
      border-variant="primary"
      :header="`Follows:
      ${followingCount} users`"
      header-bg-variant="primary"
      header-text-variant="white"
      align="center"
    >
      <b-row>
        <b-col>
          <b-pagination
            v-if="followingCount"
            v-model="currentFollowsPage"
            :total-rows="followingCount"
            :per-page="perPage"
            align="center"
            @input="getFollowsUserList"
          ></b-pagination>
        </b-col>
      </b-row>
      <b-row v-for="user in followingUserList" :key="user.id">
        <b-col md="9">
          <user-avatar :id="user.id" class="float-left" :name="user.name" />
        </b-col>
        <b-col md="3">
          <b-button
            v-if="getLoggedUserId() === $route.params.id"
            type="submit"
            variant="primary"
            class="float-right"
          >
            Unfollow
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import LoggedUserMixin from '../plugins/LoggedUserMixin'
import { User } from '../store/types'
import userAvatar from './userAvatar.vue'
export default Vue.extend({
  components: { userAvatar },
  mixins: [LoggedUserMixin],
  data() {
    return {}
  },
  computed: {
    followingCount() {
      return this.$store.getters['follows/getFollowsCount']
    },
    currentFollowsPage: {
      get() {
        return this.$store.getters['follows/getCurrentFollowsPage']
      },
      set(value: number) {
        this.$store.commit('follows/SET_CURRENT_FOLLOWS_PAGE', value)
      },
    },
    followingUserList(): User[] {
      return this.$store.getters['follows/getFollowingUserList']
    },
    perPage() {
      return this.$store.getters['follows/getPerPage']
    },
  },
  async created() {
    await this.getFollowsUserList()
  },
  methods: {
    async getFollowsUserList() {
      await this.$store.dispatch('follows/getFollowsUserList')
    },
  },
})
</script>