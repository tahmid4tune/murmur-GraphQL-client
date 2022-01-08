<template>
  <div>
    <b-row>
      <b-col md="8" sm="0"></b-col>
      <b-col md="3" sm="12">
        <b-form-input
          v-model="name"
          type="search"
          @input="searchUsers"
        ></b-form-input>
      </b-col>
      <b-col md="1" sm="0"></b-col>
    </b-row>
    <b-row>
      <b-col md="1" sm="0"></b-col>
      <b-col md="10" sm="12">
        <b-table striped hover :items="foundUsers" :fields="fields">
          <template #cell(action)="row">
            <b-button
              v-if="getLoggedUserId() != row.item.id"
              size="sm"
              class="mr-2"
              @click="toggleFollow(row.item, row.item.isFollowing)"
            >
              {{ row.item.isFollowing ? 'Unfollow' : 'Follow' }}
            </b-button>
          </template>
        </b-table>
      </b-col>
      <b-col md="1" sm="0"></b-col>
    </b-row>
    <b-row>
      <b-col md="1" sm="0"></b-col>
      <b-col md="10" sm="12">
        <b-pagination
          v-model="currentUsersPage"
          :total-rows="totalUserCount"
          :per-page="perPage"
          align="center"
          @input="searchUsers"
        ></b-pagination>
      </b-col>
      <b-col md="1" sm="0"></b-col>
    </b-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import LoggedUserMixin from '../../plugins/LoggedUserMixin'
import { UserWithFollowRecord } from '../../store/types'
export default Vue.extend({
  mixins: [LoggedUserMixin],
  layout: 'defaultLayout',
  data() {
    return {
      name: '',
      fields: ['id', 'name', 'action'],
    }
  },
  computed: {
    totalUserCount() {
      return this.$store.getters['users/getTotalUserCount']
    },
    currentUsersPage: {
      get() {
        return this.$store.getters['users/getCurrentUserListPage']
      },
      set(value) {
        this.$store.commit('users/SET_CURRENT_USER_LIST_PAGE', value)
      },
    },
    perPage() {
      return this.$store.getters['users/getPerPage']
    },
    foundUsers() {
      return this.$store.getters['users/getSearchedUserList']
    },
  },
  async created() {
    await this.searchUsers()
  },
  methods: {
    async searchUsers() {
      await this.$store.dispatch('users/findUsers', this.name)
    },
    async toggleFollow(item: UserWithFollowRecord, isFollowing: boolean) {
      const action = `follows/${isFollowing ? 'unfollowUser' : 'followUser'}`
      await this.$store.dispatch(action, item.id)
    },
  },
})
</script>