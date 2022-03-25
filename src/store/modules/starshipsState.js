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
  // ============================================
  // starships

  /*
   * @name - setPeople
   * @descrition - Set initial starships state
   */
  @Mutation
  setStarships(data) {
    this.starships = data
  }

  // ============================================
  // starship

  /*
   * @name - setStarship
   * @descrition - Set current starship
   */
  @Mutation
  setStarship(starship) {
    this.selectedStarshipState = starship
  }

  /*
   * @name - clearStarship
   * @descrition - Clear starship
   */
  @Mutation
  clearStarship() {
    this.selectedStarshipState = {}
  }

  // ============================================
  // states

  /*
   * @name - starshipsInitialState
   * @descrition - Initial state of the starships object
   */
  starshipsInitialState = {}

  /*
   * @name - selectedStarshipState
   * @descrition - State of the currently selected starship
   */
  selectedStarshipState = {}

  starships = { ...this.starshipsInitialState }
}
