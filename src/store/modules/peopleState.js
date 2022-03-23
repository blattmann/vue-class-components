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
  name: 'peopleState'
})
export default class PeopleModule extends VuexModule {
  // ============================================
  // people

  /*
   * @name - setPeople
   * @descrition - Set initial people state
   */
  @Mutation
  setPeople(data) {
    this.people = data
  }

  /*
   * @name - updatePeople
   * @descrition - Updates people object with changes of a person
   */
  @Mutation
  updatePeople(payload) {
    // adds the updated object to the end of the array
    // this.people = [
    //   ...this.people.filter(element => element.name !== payload.personName),
    //   payload.personObject
    // ]

    // updates the object and keeps its position in the array
    this.people = [
      ...this.people.map(element =>
        element.name !== payload.personName
          ? element
          : { ...element, ...payload.personObject }
      )
    ]
  }

  // ============================================
  // person

  /*
   * @name - setPerson
   * @descrition - Set current person
   */
  @Mutation
  setPerson(person) {
    this.selectedPersonState = person
  }

  /*
   * @name - clearPerson
   * @descrition - Clear person
   */
  @Mutation
  clearPerson() {
    this.selectedPersonState = {}
  }

  // ============================================
  // states

  /*
   * @name - peopleInitialState
   * @descrition - Initial state of the people object
   */
  peopleInitialState = {}

  /*
   * @name - selectedPersonState
   * @descrition - State of the currently selected person
   */
  selectedPersonState = {}

  people = { ...this.peopleInitialState }
}
