// Core
import Vue from 'vue'
import Component from 'vue-class-component'

import { isEmpty } from 'lodash'

// Vuex
import { State } from 'vuex-class'

/*
 * @name - TvFindPerson
 * @descrition - Find the selected person
 * @decorator - @State
 * @type - State<T>
 * @param - namespace: string - peopleState
 */
@Component
export default class TvFindPerson extends Vue {
  // Component data
  character = null

  // people state
  @State('people', { namespace: 'peopleState' })
  people

  created() {
    this.findPerson()
  }

  findPerson() {
    if (!isEmpty(this.people)) {
      const personObject = this.people.filter(obj => obj.name === this.person)

      // clone the result to make it mutable
      this.character = { ...personObject[0] }

      // safe the result in the store
      this.$store.commit('peopleState/setPerson', personObject[0])
    }
  }
}
