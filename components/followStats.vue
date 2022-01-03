<template>
  <div>
    <b-card
      border-variant="primary"
      header="Following Stats"
      header-bg-variant="primary"
      header-text-variant="white"
      align="center"
    >
      <b-row> Follows: {{ following }}</b-row>
      <b-row> Followed By: {{ followedBy }}</b-row>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
const followStats = require('~/apollo/queries/followStats.gql')
export default Vue.extend({
  data() {
    return {
      followedBy: 0,
      following: 0,
    }
  },
  async created() {
    try {
      const { data } = await (this as any).$apollo.query({
        query: followStats,
        variables: {
          id: parseInt(this.$route?.params?.id),
        },
      })
      this.followedBy = data?.followStat?.followedBy || 0
      this.following = data?.followStat?.follows || 0
    } catch (error) {}
  },
})
</script>