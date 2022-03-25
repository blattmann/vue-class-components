// Core
import Vue from 'vue'
import Component from 'vue-class-component'

import { isEmpty } from 'lodash'

// Vuex
import { State } from 'vuex-class'

/*
 * @name - TvFindPlanet
 * @descrition - Find the selected planet
 * @decorator - @State
 * @type - State<T>
 * @param - namespace: string - planetsState
 */
@Component
export default class TvFindPlanet extends Vue {
  // Component data
  item = null

  // planets state
  @State('planets', { namespace: 'planetsState' })
  planets

  created() {
    this.findPlanet()
  }

  findPlanet() {
    if (!isEmpty(this.planets)) {
      const planetObject = this.planets.filter(obj => obj.name === this.planet)

      // clone the result to make it mutable
      this.item = { ...planetObject[0] }

      // safe the result in the store
      this.$store.commit('planetsState/setPlanet', planetObject[0])
    }
  }
}
