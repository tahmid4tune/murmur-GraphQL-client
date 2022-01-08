<template>
  <div>
    <b-card
      border-variant="primary"
      :header="`Followed By:
      ${followedByCount} users`"
      header-bg-variant="primary"
      header-text-variant="white"
      align="center"
    >
      <b-row>
        <b-col>
          <b-pagination
            v-model="currentFollowedByPage"
            :total-rows="followedByCount"
            :per-page="perPage"
            align="center"
            @input="getFollowedByUserList"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      perPage: 10,
    }
  },
  computed: {
    followedByCount() {
      return this.$store.getters['follows/getFollowedByCount']
    },
    currentFollowedByPage: {
      get() {
        return this.$store.getters['follows/getCurrentFollowedByPage']
      },
      set(value: number) {
        this.$store.commit('follows/SET_CURRENT_FOLLOWED_BY_PAGE', value)
      },
    },
  },
  methods: {
    async getFollowedByUserList() {},
  },
})
</script>