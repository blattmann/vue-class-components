// Core
import Vue from 'vue'
import Component from 'vue-class-component'

/*
 * @name - TvGetDataMixin
 * @descrition - Handles the API calls
 */
@Component
export default class TvGetDataMixin extends Vue {
  getPeople() {
    this.$api.getPeople().then(response => {
      if (response) {
        const people = response.results
        // Store the response
        this.$store.commit('peopleState/setPeople', people)
        this.$store.commit('appState/setloading', false)
      } else {
        console.warn('No people data available.')
      }
    })
  }

  getPlanets() {
    this.$api.getPlanets().then(response => {
      if (response) {
        const planets = response.results
        // Store the response
        this.$store.commit('planetsState/setPlanets', planets)
        this.$store.commit('appState/setloading', false)
      } else {
        console.warn('No planets data available.')
      }
    })
  }

  getStarships() {
    this.$api.getStarships().then(response => {
      if (response) {
        const starships = response.results
        // Store the response
        this.$store.commit('starshipsState/setStarships', starships)
        this.$store.commit('appState/setloading', false)
      } else {
        console.warn('No starships data available.')
      }
    })
  }
}
