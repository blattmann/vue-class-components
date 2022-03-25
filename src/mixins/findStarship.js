// Core
import Vue from 'vue'
import Component from 'vue-class-component'

import { isEmpty } from 'lodash'

// Vuex
import { State } from 'vuex-class'

/*
 * @name - TvFindStarship
 * @descrition - Find the selected starship
 * @decorator - @State
 * @type - State<T>
 * @param - namespace: string - starshipsState
 */
@Component
export default class TvFindStarship extends Vue {
  // Component data
  item = null

  // starships state
  @State('starships', { namespace: 'starshipsState' })
  starships

  created() {
    this.findStarship()
  }

  findStarship() {
    if (!isEmpty(this.starships)) {
      const starshipObject = this.starships.filter(
        obj => obj.name === this.starship
      )

      // clone the result to make it mutable
      this.item = { ...starshipObject[0] }

      // safe the result in the store
      this.$store.commit('starshipsState/setStarship', starshipObject[0])
    }
  }
}
