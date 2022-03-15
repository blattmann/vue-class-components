<template>
  <div>
    <tv-navigation />
    <template v-if="loading">
      <tv-spinner />
    </template>

    <template v-else>
      <h1>Planets</h1>
    </template>
  </div>
</template>

<script>
// Core
import Component, { mixins } from 'vue-class-component'

// Mixins
import TvLoading from '@/mixins/loading'

// Component imports
import TvNavigation from '@/components/navigation/Navigation'
import TvSpinner from '@/components/spinner/Spinner'

/**
 *  TvIndex
 *
 *  @desc - SWAPI Main Page
 *
 *  @author Front End Dev @Certipath
 *
 *  Mon Mar 7 09:00:00 MST 2022
 */
@Component({
  layout: 'default',
  components: {
    TvNavigation,
    TvSpinner
  }
})
export default class TvIndex extends mixins(TvLoading) {
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

<style>
/* styles */
</style>
