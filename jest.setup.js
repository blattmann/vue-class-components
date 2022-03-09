import { Nuxt, Builder } from 'nuxt'
import nuxtConfig from './nuxt.config'
import { sprintf } from 'sprintf-js'

console.log = (msg, args) => {
  const str = sprintf(msg, args)
  process.stderr.write(str + '\n')
}

const resetConfig = {
  loading: false,
  loadingIndicator: false,
  fetch: {
    client: false,
    server: false
  },
  features: {
    store: true,
    layouts: false,
    meta: false,
    middleware: {
      auth: false
    },
    transitions: false,
    deprecations: false,
    validate: false,
    asyncData: false,
    fetch: false,
    clientOnline: false,
    clientPrefetch: false,
    clientUseUrl: false,
    componentAliases: false,
    componentClientOnly: false
  },
  build: {
    indicator: false,
    terser: false
  }
}

const config = Object.assign({}, nuxtConfig, resetConfig, {
  mode: 'spa',
  srcDir: nuxtConfig.srcDir,
  ignore: ['**/components/**/*', '**/layouts/**/*', '**/pages/**/*'],
  buildModules: ['@nuxtjs/vuetify']
})

const buildNuxt = async () => {
  const nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  return nuxt
}

module.exports = async () => {
  const nuxt = await buildNuxt()
  process.env.buildDir = nuxt.options.buildDir
}
