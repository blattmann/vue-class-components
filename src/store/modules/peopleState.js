// Vuex
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

const peopleObject = {}

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
  name: 'peopleState'
})
export default class PeopleModule extends VuexModule {
  @Mutation
  init(data) {
    this.People = data
  }

  @Mutation
  reset() {
    this.People = { ...this.peopleInitialState }
  }

  @Mutation
  setPeople(data) {
    this.People = data
  }

  peopleInitialState = peopleObject

  People = { ...this.peopleInitialState }
}
