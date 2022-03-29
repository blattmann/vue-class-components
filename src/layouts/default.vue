<template>
  <v-app role="application">
    <div class="tv-stars"></div>
    <div class="tv-twinkling"></div>
    <tv-navigation />
    <template v-if="loading">
      <tv-spinner />
    </template>

    <main-view role="main" class="tv-container" />

    <template>
      <v-footer padless class="tv-footer">
        <v-col cols="12">
          <v-row>
            <v-col cols="4">
              created {{ new Date().getFullYear() }} by
              <strong>Stefan Blatmann</strong>
            </v-col>
            <v-col cols="8" class="text-right">
              Star Wars and all associated names and/or images are copyright
              Lucasfilm Ltd. Images were freely collected from
              <a href="http://starwars.wikia.com/wiki/Main_Page">Wookiepedia</a
              >.
            </v-col>
          </v-row>
        </v-col>
      </v-footer>
    </template>
  </v-app>
</template>

<script>
// Core
import Component, { mixins } from 'vue-class-component'

// Mixins
import TvLoading from '@/mixins/loading'

// Component imports
import MainView from '@/layouts/MainView'
import TvSpinner from '@/components/spinner/Spinner'
import TvNavigation from '@/components/navigation/Navigation'

/**
 *  @desc - Default App Layout
 *
 *  @author Front End Dev @Certipath
 *
 *  Mon Feb 24 13:15:38 EST 2020
 */
@Component({
  components: {
    MainView,
    TvSpinner,
    TvNavigation
  }
})
export default class TvDefaultLayout extends mixins(TvLoading) {
  // Component data
  timeout = null

  mounted() {
    this.setTimeOutClose()
  }

  beforeDestroy() {
    clearTimeout(this.timeout)
  }

  // Component method
  setTimeOutClose() {
    this.timeout = setTimeout(() => {
      // Handle loading
      this.$store.commit('appState/setloading', false)
    }, 500)
  }
}
</script>
