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
  @Mutation
  init(data) {
    this.planets = data
  }

  @Mutation
  reset() {
    this.planets = { ...this.planetsInitialState }
  }

  @Mutation
  setPlanets(data) {
    this.planets = data
  }

  planetsInitialState = {}

  planets = { ...this.planetsInitialState }
}
