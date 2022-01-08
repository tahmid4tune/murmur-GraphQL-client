import { ActionTree, GetterTree, MutationTree } from "vuex/types";
import { namespace } from "vuex-class";
import { FollowState, User } from "./types";

const followStats = require('~/apollo/queries/followStats.gql')
const followingUserList = require('~/apollo/queries/followingList.gql')

export const state = (): FollowState => ({
    followedByCount: 0,
    followingCount: 0,
    currentFollowsPage: 1,
    currentFollowedByPage: 1,
    perPage: 10,
    followingUserList: []
});

export const getters: GetterTree<FollowState, FollowState> = {
    getFollowsCount: (state: FollowState): number => state.followingCount,
    getFollowedByCount: (state: FollowState): number => state.followedByCount,
    getCurrentFollowsPage: (state: FollowState): number => state.currentFollowsPage,
    getCurrentFollowedByPage: (state: FollowState): number => state.currentFollowedByPage,
    getFollowingUserList: (state: FollowState): User[] => state.followingUserList,
    getPerPage: (state: FollowState): number => state.perPage,
}

export const actions: ActionTree<FollowState, FollowState> = {
    async getFollowStatCounts({commit},payload) {
        const apollo = this.app.apolloProvider.defaultClient;
        try {
            const { data } = await apollo.query({
            query: followStats,
            variables: {
                    id: parseInt(payload),
                },
            })
            commit("SET_FOLLOWS_COUNT",data?.followStat?.follows || 0);
            commit("SET_FOLLOWED_BY_COUNT",data?.followStat?.followedBy || 0);
        } catch (error) {
            console.log(error);
        }
    },
    async getFollowsUserList({commit, state}) {
        const apollo = this.app.apolloProvider.defaultClient;
        try {
            const { data } = await apollo.query({
                query: followingUserList,
                variables: {
                    paginationInput: {
                        page: state.currentFollowsPage,
                        perPage: state.perPage,
                    },
                    },
                })
            commit("SET_FOLLOWING_USER_LIST",data?.followingUserList)
        } catch (error) {
            
        }
    }
}
export const mutations: MutationTree<FollowState> = {
    SET_FOLLOWS_COUNT(state: FollowState, data) {
        state.followingCount = data;
    },
    SET_FOLLOWED_BY_COUNT(state: FollowState, data) {
        state.followedByCount = data;
    },
    SET_CURRENT_FOLLOWS_PAGE(state: FollowState, data) {
        state.currentFollowsPage = data;
    },
    SET_CURRENT_FOLLOWED_BY_PAGE(state: FollowState, data) {
        state.currentFollowedByPage = data;
    },
    SET_FOLLOWING_USER_LIST(state: FollowState, data) {
        state.followingUserList = data;
    }
}

export const usersVuexNamespace = namespace("follows/");