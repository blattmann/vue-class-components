// Vuex
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

/**
 *  @desc -
 *
 *  @author Front End Dev @Certipath
 *
 * Mar 09 2022 16:00:00
 */
@Module({
  stateFactory: true,
  namespaced: true,
  name: 'planetsState'
})
export default class PlanetsModule extends VuexModule {
  // ============================================
  // planets

  /*
   * @name - setPeople
   * @descrition - Set initial planets state
   */
  @Mutation
  setPlanets(data) {
    this.planets = data
  }

  // ============================================
  // planet

  /*
   * @name - setPlanet
   * @descrition - Set current planet
   */
  @Mutation
  setPlanet(planet) {
    this.selectedPlanetState = planet
  }

  /*
   * @name - clearPlanet
   * @descrition - Clear planet
   */
  @Mutation
  clearPlanet() {
    this.selectedPlanetState = {}
  }

  // ============================================
  // states

  /*
   * @name - planetsInitialState
   * @descrition - Initial state of the planets object
   */
  planetsInitialState = {}

  /*
   * @name - selectedPlanetState
   * @descrition - State of the currently selected planet
   */
  selectedPlanetState = {}

  planets = { ...this.planetsInitialState }
}
