import { ActionTree, GetterTree, MutationTree } from "vuex/types";
import { namespace } from "vuex-class";
import { Post, UserState } from "./types";

const postsByUser = require('~/apollo/queries/postsByUser.gql')

const updatePost = require('~/apollo/mutations/updatePost.gql')

export const state = (): UserState => ({
    followingUserList: [],
    followedByUserList: [],
    totalPostsByUser: 0,
    currentPostPage: 1,
    currentFollowedByUserPage: 1,
    currentFollowingUserPage: 1,
    perPage: 10,
    postList: [],
});

export const getters: GetterTree<UserState, UserState> = {
    getTotalPostsByUser: (state: UserState): number => state.totalPostsByUser,
    getCurrentPostPage: (state: UserState): number => state.currentPostPage,
    getUserPostsOnThisPage: (state: UserState): Post[] => state.postList,
}

export const actions: ActionTree<UserState, UserState> = {
    async getPostsByUser({commit, state}, payload) {
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
    }
}
export const usersVuexNamespace = namespace("users/");