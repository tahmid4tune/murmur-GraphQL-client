import { ActionTree, GetterTree, MutationTree } from "vuex/types";
import { namespace } from "vuex-class";
import { Post, PostState, } from "./types";
const posts = require('~/apollo/queries/post.gql')
const createPost = require('~/apollo/mutations/post.gql')

export const state = (): PostState => ({
    postList: [],
    total: 0,
    currentPage: 1,
    perPage: 10,
});


export const getters: GetterTree<PostState, PostState> = {
    getPaginatedPosts: (state: PostState): Post[] => state.postList,
    getCurrentPage: (state: PostState): number => state.currentPage,
    getTotal: (state: PostState): number => state.total,
    getPerPage: (state: PostState): number => state.perPage,
}

export const actions: ActionTree<PostState, PostState> = {
    async getPostsForUser({ commit, state }) {
        const apollo = this.app.apolloProvider.defaultClient;
        try {
            const { data } = await apollo.query({
                query: posts,
                variables: {
                    paginationInput: {
                        page: state.currentPage,
                        perPage: state.perPage,
                    },
                },
                fetchPolicy: 'network-only', // #GQL
            })
            commit("SET_TOTAL", data?.posts?.total || 0);
            commit("SET_POSTS", data?.posts?.posts || []);
        } catch (error) {
            console.error(error)
        }
    },

    async createPost({ }, payload) {
        const apollo = this.app.apolloProvider.defaultClient;
        try {
            await apollo.mutate({
                mutation: createPost,
                variables: {
                    createPostInput: {
                        text: payload,
                    },
                },
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export const mutations: MutationTree<PostState> = {
    SET_FILTER(_state: PostState, _data) {
        // state.filter = data;
    },
    SET_TOTAL(state: PostState, data) {
        state.total = data;
    },
    SET_POSTS(state: PostState, data) {
        state.postList = data;
    },
    SET_CURRENT_PAGE(state: PostState, data) {
        console.log('page number:', data)
        state.currentPage = data;
    }
}

export const landlordVuexNamespace = namespace("posts/");

