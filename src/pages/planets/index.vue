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

// Vuex
import { State } from 'vuex-class'

// Mixins
import TvLoading from '@/mixins/loading'

// Component imports
import TvNavigation from '@/components/navigation/Navigation'
import TvSpinner from '@/components/spinner/Spinner'

/**
 *  TvPlanets
 *
 *  @desc - SWAPI Planets Page
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
export default class TvPlanets extends mixins(TvLoading) {
  // Component data
  timeout = null

  @State('people', { namespace: 'peopleState' })
  people

  created() {
    console.log('state people: ', this.people)
  }

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
/* styles */
</style>
