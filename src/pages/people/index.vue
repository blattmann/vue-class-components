<template>
  <div>
    <h1>People</h1>
    <v-container class="tv-people text-center">
      <v-row class="fill-height" align="center" justify="left">
        <template v-for="item in people">
          <v-col :key="item.name" cols="12" md="4" class="pa-0 pb-6 pa-md-6">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
              >
                <v-card-title class="text-h6">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <v-col cols="12">
                      <p class="ml-3 mt-3 subheading text-left">
                        {{ item.name }}
                      </p>
                    </v-col>

                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="8">
                          <p
                            class="ml-3 text-body-1 font-weight-bold text-left"
                          >
                            Hair color: {{ item.hair_color }}
                          </p>
                          <p
                            class="ml-3 text-body-1 font-weight-bold text-left"
                          >
                            Eye color: {{ item.eye_color }}
                          </p>
                          <p
                            class="ml-3 text-body-1 font-weight-bold text-left"
                          >
                            <nuxt-link
                              :to="`people/${encodeURIComponent(item.name)}`"
                            >
                              Details
                            </nuxt-link>
                          </p>
                        </v-col>
                        <v-col cols="4">
                          <p class="tv-people__button font-weight-bold">
                            <v-btn elevation="2" @click="editItem(item.name)">
                              Edit
                            </v-btn>
                          </p>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-title>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </v-container>

    <template v-if="dialog">
      <v-dialog
        v-model="dialog"
        class="tv-people__dialog"
        content-class="tv-people__dialog"
        fullscreen
        transition="dialog-bottom-transition"
      >
        <tv-edit-person :person="person" />
      </v-dialog>
    </template>
  </div>
</template>

<script>
// Core
import Component, { mixins } from 'vue-class-component'

import { isEmpty } from 'lodash'

// Vuex
import { State } from 'vuex-class'

// Mixins
import TvLoading from '@/mixins/loading'
import TvNavigationHelper from '@/mixins/navigationHelper'

// Component imports
import TvEditPerson from '@/components/dialog/editPerson.vue'
import TvSpinner from '@/components/spinner/Spinner'

/**
 *  TvPeople
 *
 *  @desc - SWAPI People Page
 *
 *  @author Front End Dev @Certipath
 *
 *  Mon Mar 7 09:00:00 MST 2022
 */
@Component({
  layout: 'default',
  components: {
    TvSpinner,
    TvEditPerson
  }
})
export default class TvPeople extends mixins(TvLoading, TvNavigationHelper) {
  // Data
  apiCount = 0
  dialog = false
  person = ''

  @State('people', { namespace: 'peopleState' })
  people

  created() {
    // get data
    this.retrieveData()

    this.$nuxt.$on('show-modal', () => {
      // clear store values
      this.$store.commit('peopleState/clearPerson', true)

      // close dialog
      this.closeDialog()
    })
  }

  // Methods
  async retrieveData() {
    if (isEmpty(this.people)) {
      // getPeople API call
      await this.getPeople()
    }

    // getStarships API call
    await this.getStarships()

    // getPlanets API call
    await this.getPlanets()
  }

  getPeople() {
    this.$api.getPeople().then(response => {
      if (response) {
        this.hideSpinner()
        const people = response.results
        // Store the response
        this.$store.commit('peopleState/setPeople', people)
      } else {
        console.warn('No people data available.')
      }
    })
  }

  getStarships() {
    this.$api.getStarships().then(response => {
      if (response) {
        this.hideSpinner()
        const starships = response.results
        // Store the response
        this.$store.commit('starshipsState/setStarships', starships)
      } else {
        console.warn('No starship data available.')
      }
    })
  }

  getPlanets() {
    this.$api.getPlanets().then(response => {
      if (response) {
        this.hideSpinner()
        const planets = response.results
        // Store the response
        this.$store.commit('planetsState/setPlanets', planets)
      } else {
        console.warn('No planets data available.')
      }
    })
  }

  hideSpinner() {
    this.apiCount += 1
    if (this.apiCount === 3) {
      this.$store.commit('appState/setloading', false)
    }
  }

  editItem(item) {
    console.log(item)
    this.dialog = true
    this.person = item
  }

  closeDialog() {
    this.dialog = false
  }
}
</script>

<style lang="postcss">
.tv-people {
  &__button {
    position: absolute;
    bottom: 12px;
    right: 24px;
  }

  .v-card {
    transition: opacity 0.4s ease-in-out;

    &:not(.on-hover) {
      opacity: 0.8;
    }
  }

  &__dialog {
    background-color: #fff;

    .v-card {
      width: 100%;
      box-shadow: none;
    }
  }
}
</style>
