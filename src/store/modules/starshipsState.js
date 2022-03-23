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
  name: 'starshipsState'
})
export default class StarshipsModule extends VuexModule {
  @Mutation
  init(data) {
    this.starships = data
  }

  @Mutation
  reset() {
    this.starships = { ...this.starshipsInitialState }
  }

  @Mutation
  setStarships(data) {
    this.starships = data
  }

  starshipsInitialState = {}

  starships = { ...this.starshipsInitialState }
}
