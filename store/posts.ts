import { ActionTree, GetterTree, MutationTree } from "vuex/types";
import { namespace } from "vuex-class";
import { Post, PostState, User, } from "./types";

const posts = require('~/apollo/queries/post.gql')
const createPost = require('~/apollo/mutations/createPost.gql')
const updatePost = require('~/apollo/mutations/updatePost.gql')
const removePost = require('~/apollo/mutations/removePost.gql')
const likePost = require('~/apollo/mutations/likePost')
const dislikePost = require('~/apollo/mutations/dislikePost')

export const state = (): PostState => ({
    postList: [],
    editModePosts: [],
    total: 0,
    currentPage: 1,
    perPage: 10,
});


export const getters: GetterTree<PostState, PostState> = {
    getPaginatedPosts: (state: PostState): Post[] => state.postList,
    getCurrentPage: (state: PostState): number => state.currentPage,
    getTotal: (state: PostState): number => state.total,
    getPerPage: (state: PostState): number => state.perPage,
    getPostsInEditMode: (state: PostState): number[] => state.editModePosts
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

    async deletePost({ }, payload) {
        const apollo = this.app.apolloProvider.defaultClient;
        try {
            await apollo.mutate({
                mutation: removePost,
                variables: {
                    id: payload,
                },
            })
        } catch (error) {
            console.error(error)
        }
    },

    async likePost({ commit }, payload) {
        const apollo = this.app.apolloProvider.defaultClient;
        try {
            const postId = parseInt(payload)
            const { data } = await apollo.mutate({
                mutation: likePost,
                variables: {
                    id: postId,
                },
            })
            commit("SET_LIKE_ON_POST", {
                postId,
                likeId: data.likePost.id,
                likedBy: data.likePost.likedBy
            })
        } catch (error) {
            console.error(error)
        }
    },

    async unlikePost({ commit }, payload: { postId: number, unlikedBy: number }) {
        const apollo = this.app.apolloProvider.defaultClient;
        try {
            await apollo.mutate({
                mutation: dislikePost,
                variables: {
                    id: payload.postId,
                },
            })
            commit("REMOVE_LIKE_FROM_POST", payload)
        } catch (error) {
            console.error(error)
        }
    }
}

export const mutations: MutationTree<PostState> = {
    SET_TOTAL(state: PostState, data) {
        state.total = data;
    },
    SET_POSTS(state: PostState, data) {
        state.postList = data;
    },
    SET_CURRENT_PAGE(state: PostState, data) {
        state.currentPage = data;
    },
    SET_POST_IN_EDIT_MODE(state: PostState, data) {
        state.editModePosts.push(data);
    },
    SET_POST_IN_READ_MODE(state: PostState, data) {
        const index = state.editModePosts.indexOf(data);
        if (index > -1) {
            state.editModePosts.splice(index, 1);
        }
    },
    SET_UPDATED_TEXT_ON_POST(state: PostState, data) {
        const updatedPost: Post = state.postList.filter((post) => post.id === data.id)[0];
        updatedPost.text = data.text;
    },
    SET_LIKE_ON_POST(state: PostState, data: { likeId: number, postId: number, likedBy: User }) {
        const post: Post = state.postList.filter((post) => post.id === data.postId)[0];
        post.likes.push({ id: data.likeId, likedBy: data.likedBy })
    },
    REMOVE_LIKE_FROM_POST(state: PostState, data: { postId: number, unlikedBy: number }) {
        const post: Post = state.postList.filter((post) => post.id === data.postId)[0];
        let likeIndex = -1;
        post.likes.find((like, index) => {
            if (like.likedBy.id === data.unlikedBy) {
                likeIndex = index;
                return like;
            }
        })
        post.likes.splice(likeIndex, 1);
    }
}

export const landlordVuexNamespace = namespace("posts/");

