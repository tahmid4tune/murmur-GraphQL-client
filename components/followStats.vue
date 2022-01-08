<template>
  <div>
    <b-row>
      <b-col>
        <follows-user-list />
      </b-col>
      <b-col>
        <followed-by-list />
      </b-col>
    </b-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import FollowedByList from './followedByList.vue'
import followsUserList from './followsUserList.vue'
export default Vue.extend({
  components: { followsUserList, FollowedByList },
  data() {
    return {}
  },
  async created() {
    await this.$store.dispatch(
      'follows/getFollowStatCounts',
      this.$route.params?.id
    )
  },
})
</script>