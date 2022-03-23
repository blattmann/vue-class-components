<template>
  <v-app role="application">
    <tv-navigation />
    <template v-if="loading">
      <tv-spinner />
    </template>

    <main-view role="main" class="tv-container" />

    <template>
      <v-footer padless class="tv-footer">
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>Stefan Blatmann</strong>
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

<style lang="postcss">
.tv-container {
  background: url('~/assets/images/background.jpg') no-repeat center center
    fixed;
  background-size: cover;
}

.tv-divider {
  padding: 8px 0;
}

.tv-footer {
  position: sticky;
  bottom: 0;
}
</style>
