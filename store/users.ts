import { ActionTree, GetterTree, MutationTree } from "vuex/types";
import { namespace } from "vuex-class";
import { Post, UserState, UserWithFollowRecord } from "./types";

const postsByUser = require('~/apollo/queries/postsByUser.gql')
const users = require('~/apollo/queries/users.gql')

const updatePost = require('~/apollo/mutations/updatePost.gql')

export const state = (): UserState => ({
    followingUserList: [],
    followedByUserList: [],
    totalPostsByUser: 0,
    currentPostPage: 1,
    currentUsersPage: 1,
    currentFollowedByUserPage: 1,
    currentFollowingUserPage: 1,
    perPage: 10,
    postList: [],
    userList: [],
    totalUsers: 0,
});

export const getters: GetterTree<UserState, UserState> = {
    getTotalPostsByUser: (state: UserState): number => state.totalPostsByUser,
    getCurrentPostPage: (state: UserState): number => state.currentPostPage,
    getUserPostsOnThisPage: (state: UserState): Post[] => state.postList,
    getSearchedUserList: (state: UserState): UserWithFollowRecord[] => state.userList,
    getTotalUserCount: (state: UserState): number => state.totalUsers,
    getCurrentUserListPage: (state: UserState): number => state.currentUsersPage,
    getPerPage: (state: UserState): number => state.perPage,
}

export const actions: ActionTree<UserState, UserState> = {
    async findUsers({ commit, state }, payload) {
        console.log(payload)
        const apollo = this.app.apolloProvider.defaultClient;
        try {
            const { data } = await apollo.query({
                query: users,
                variables: {
                    paginationInput: {
                        page: state.currentUsersPage,
                        perPage: state.perPage,
                    },
                    name: payload,
                },
                fetchPolicy: 'network-only',
            })
            commit('SET_SEARCHED_USER_LIST', data?.users?.users || [])
            commit('SET_TOTAL_USER_COUNT', data?.users?.total || 0)
        } catch (error) {

        }
    },
    async getPostsByUser({ commit, state }, payload) {
        const apollo = this.app.apolloProvider.defaultClient;
        try {
            const { data } = await apollo.query({
                query: postsByUser,
                variables: {
                    paginationInput: {
                        page: state.currentPostPage,
                        perPage: state.perPage,
                    },
                    id: parseInt(payload),
                },
                fetchPolicy: 'network-only',
            })
            commit("SET_TOTAL_POST_BY_USER", data?.postsByUser?.total || 0);
            commit("SET_POSTS_BY_USER", data?.postsByUser?.posts || []);
        } catch (error) {
            console.error(error)
        }
    },
    async updatePost({ commit }, payload) {
        const apollo = this.app.apolloProvider.defaultClient;
        try {
            const { data } = await apollo.mutate({
                mutation: updatePost,
                variables: {
                    updatePostInput: {
                        id: payload.id,
                        text: payload.text,
                    },
                },
            })
            commit("SET_UPDATED_TEXT_ON_POST", { id: data.updatePost.id, text: data.updatePost.text });
        } catch (error) {
            console.error(error)
        }
    },
}

export const mutations: MutationTree<UserState> = {
    SET_TOTAL_POST_BY_USER(state: UserState, data) {
        state.totalPostsByUser = data;
    },
    SET_POSTS_BY_USER(state: UserState, data) {
        state.postList = data;
    },
    SET_CURRENT_POST_PAGE(state: UserState, data) {
        state.currentPostPage = data;
    },
    SET_UPDATED_TEXT_ON_POST(state: UserState, data) {
        const updatedPost: Post = state.postList.filter((post) => post.id === data.id)[0];
        updatedPost.text = data.text;
    },
    SET_SEARCHED_USER_LIST(state: UserState, data) {
        state.userList = data;
    },
    SET_TOTAL_USER_COUNT(state: UserState, data) {
        state.totalUsers = data;
    },
    SET_CURRENT_USER_LIST_PAGE(state: UserState, data) {
        state.currentUsersPage = data;
    },
    UPDATE_FOLLOW_STATE(state: UserState) {
        const user: UserWithFollowRecord[] = state.userList.filter((user) => user.id);
        if (user?.length) {
            user[0].isFollowing = !user[0].isFollowing;
        }

    }
}
export const usersVuexNamespace = namespace("users/");