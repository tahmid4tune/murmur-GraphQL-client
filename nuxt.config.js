export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'insta-mini-client',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  server: {
    port: 4000,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://www.npmjs.com/package/@nuxtjs/apollo
    '@nuxtjs/apollo',
  ],
  apollo: {
    tokenName: "apollo-token", // specify token name
    cookieAttributes: {
     expires: 7 // optional, default: 7 (days)
    },
    authenticationType: 'Bearer',
    defaultOptions: {
      $query: {
        fetchPolicy: "network-only",
        errorPolicy: "all"
      }
    },
    watchLoading: "@/plugins/loadingHandler.js",
    errorHandler: "@/plugins/errorHandler.js",
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:3000/graphql',
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
