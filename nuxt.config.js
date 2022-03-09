const prodCSS =
  process.env.NODE_ENV === 'production' ? ['~/assets/css/styles.css'] : []

export default {
  ignore: ['**/*.spec.*', 'src/__tests__/*.js'],
  srcDir: 'src/',
  ssr: false,
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en-us'
    },
    title:
      'TrustVisitor Self Check-In - CertiPath’s Visitor Management Solution',
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
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/axios'],
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
        'postcss-custom-media': {},
        'postcss-media-minmax': {},
        'postcss-import': {},
        'postcss-apply': {},
        'postcss-functions': {},
        'postcss-custom-properties': {
          preserve: false
        },
        'postcss-mixins': {},
        'postcss-nested': {},
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
        'postcss-mixins',
        'postcss-nested',
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
