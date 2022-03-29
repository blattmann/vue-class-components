const prodCSS =
  process.env.NODE_ENV === 'production' ? ['~/assets/css/styles.css'] : []

// eslint-disable-next-line nuxt/no-cjs-in-config
const path = require('path')

export default {
  ignore: ['**/*.spec.*', 'src/__tests__/*.js'],
  srcDir: 'src/',
  ssr: false,
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true // Can be also an object with default options
  },
  // proxy: {
  //   '/api/': 'https://swapi.dev/'
  // },
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en-us'
    },
    title: 'Vue Class Component Dummy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    // CSS file in the project
    '@/assets/css/styles.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/axios', '~/plugins/api.js', '~/plugins/utilities.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', 'nuxt-material-design-icons'],
  /*
   ** vuetify module configurationy
   ** https://github.com/nuxt-community/vuetify-module
   */
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    treeShake: true,
    customVariables: prodCSS, // Vuetify overrides
    icons: {
      iconfont: 'mdiSvg'
    },
    defaultAssets: false,
    theme: {
      themes: {
        light: {
          primary: '#3A5E75',
          secondary: '#00bcd4',
          accent: '#ff5722',
          error: '#f44336',
          warning: '#ffc107',
          info: '#3f51b5',
          success: '#4caf50'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    terser: {
      parallel: true,
      cache: false,
      sourceMap: false,
      extractComments: {
        filename: 'LICENSES'
      },
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production'
        },
        output: {
          comments: /^\**!|@preserve|@license|@cc_on/
        }
      }
    },
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
    buildDir: 'dist',
    cssSourceMap: true,
    optimizeCSS: false,
    extractCSS: true,
    postcss: {
      plugins: {
        'postcss-custom-media': {
          importFrom: 'src/assets/css/media_vars.css'
        },
        'postcss-media-minmax': {},
        'postcss-import': {},
        'postcss-apply': {},
        'postcss-functions': {},
        'postcss-custom-properties': {},
        'postcss-nested': {},
        'postcss-mixins': {
          mixinsDir: path.join(__dirname, '/src/assets/css/mixins')
        },
        'postcss-discard-comments': {},
        'postcss-clean': {},
        'postcss-preset-env': { stage: 1 },
        'postcss-flexbugs-fixes': {},
        autoprefixer: {},
        cssnano: {}
      },
      order: [
        'postcss-custom-media',
        'postcss-media-minmax',
        'postcss-import',
        'postcss-apply',
        'postcss-functions',
        'postcss-custom-properties',
        'postcss-nested',
        'postcss-mixins',
        'postcss-discard-comments',
        'postcss-clean',
        'postcss-preset-env',
        'postcss-flexbugs-fixes',
        'autoprefixer',
        'cssnano'
      ],
      preset: {
        stage: 1,
        autoprefixer: {
          flexbox: true
        }
      }
    }
  }
}
