<template>
  <div>
    <template v-if="loading">
      <tv-spinner />
    </template>

    <template v-if="!loading && character">
      <main class="tv-person__wrapper">
        <v-container class="pa-4">
          <h1 class="pb-10 text-h2 text-center">
            {{ character.name }}
          </h1>
          <div class="tv-person__container">
            <v-row no-gutters>
              <v-col cols="12" sm="6" md="5">
                <div
                  v-if="backgroundImage"
                  :style="{
                    backgroundImage: `url(${backgroundImage})`
                  }"
                  :class="[
                    'tv-person__image',
                    { 'tv-person__image--placeholder': placeholderFirst }
                  ]"
                />
              </v-col>
              <v-col cols="6" md="7">
                <div class="ml-5">
                  <p><strong>Birth Year:</strong> {{ character.birth_year }}</p>
                  <p><strong>Eye Color:</strong> {{ character.eye_color }}</p>
                  <p><strong>Gender:</strong> {{ character.gender }}</p>
                  <p><strong>Skin Color:</strong> {{ character.skin_color }}</p>
                  <p><strong>Mass:</strong> {{ character.mass }}</p>
                  <p><strong>Height:</strong> {{ character.height }}</p>
                  <p><strong>Hair Color:</strong> {{ character.hair_color }}</p>
                  <p v-if="species && species !== 'SyntaxError'">
                    <strong>Species:</strong> {{ species }}
                  </p>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-divider class="tv-divider" />
              </v-col>
            </v-row>
          </div>

          <div v-if="planet" class="tv-person__planets">
            <h2 class="pb-10 text-h2 text-center">
              Home World
            </h2>
            <div class="tv-person__container">
              <v-row no-gutters>
                <v-col cols="12" sm="6" md="5">
                  <div
                    v-if="backgroundImageSecond"
                    :style="{
                      backgroundImage: `url(${backgroundImageSecond})`
                    }"
                    :class="[
                      'tv-person__image',
                      { 'tv-person__image--placeholder': placeholderFirst }
                    ]"
                  />
                </v-col>
                <v-col cols="6" md="7">
                  <div class="ml-5">
                    <p><strong>Name:</strong> {{ planet.name }}</p>
                    <p><strong>Terrain:</strong> {{ planet.terrain }}</p>
                    <p><strong>Climate:</strong> {{ planet.climate }}</p>
                    <p><strong>Population:</strong> {{ planet.population }}</p>
                    <p><strong>Diameter:</strong> {{ planet.diameter }}</p>
                    <p><strong>Gravity:</strong> {{ planet.gravity }}</p>
                    <p>
                      <strong>Rotation period:</strong>
                      {{ planet.rotation_period }}
                    </p>
                    <p>
                      <strong>Orbital period:</strong>
                      {{ planet.orbital_period }}
                    </p>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-divider class="tv-divider" />
                </v-col>
              </v-row>
            </div>
          </div>

          <div class="tv-person__starships text-center">
            <h2 class="pb-10 text-h2">
              Starships
            </h2>
            <div>
              <div v-if="starships && starships.length > 0">
                <v-carousel hide-delimiters>
                  <v-carousel-item
                    v-for="(item, i) in starships"
                    :key="i"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                  >
                    <v-sheet height="100%" class="pt-10" tile>
                      <p class="tv-person__starships--name text-h3">
                        {{ item.name }}
                      </p>
                      <p class="tv-person__starships--name text-h4">
                        Model: {{ item.model }}
                      </p>
                      <p class="tv-person__starships--name text-h4">
                        Type: {{ item.starship_class }}
                      </p>
                      <p v-if="item.name">
                        <img
                          :alt="item.name"
                          :src="
                            $getImage(
                              'starships',
                              $getImageName(item.name),
                              'jpg'
                            )
                          "
                          class="tv-person__starships--image"
                        />
                      </p>
                    </v-sheet>
                  </v-carousel-item>
                </v-carousel>
              </div>
              <div v-else>
                <h2 class="text-2xl font-semibold text-gray-500 pb-2">
                  {{ character.name }} has no starships 😢
                </h2>
              </div>
            </div>
          </div>
        </v-container>
      </main>
    </template>
  </div>
</template>

<script>
// Core
import Component, { mixins } from 'vue-class-component'

import { isEmpty, isArray } from 'lodash'

// Vuex
import { State } from 'vuex-class'

// Mixins
import TvLoading from '@/mixins/loading'
import TvNavigationHelper from '@/mixins/navigationHelper'
import TvFindPerson from '@/mixins/findPerson'
import TvGetBackgroundImageMixin from '@/mixins/getBackgroundImageMixin'

// Component imports
import TvSpinner from '@/components/spinner/Spinner'

/**
 *  TvPerson
 *
 *  @desc - SWAPI Person Page
 *
 *  @author Front End Dev @Certipath
 *
 *  Mon Mar 7 09:00:00 MST 2022
 */
@Component({
  layout: 'default',
  components: {
    TvSpinner
  }
})
export default class TvPerson extends mixins(
  TvLoading,
  TvNavigationHelper,
  TvFindPerson,
  TvGetBackgroundImageMixin
) {
  // Data
  person = this.$nuxt.$route.params.person
  image = this.person // needed for the background image @ `getBackgroundImageMixin`
  species = null
  starships = null
  planet = null

  // people state
  @State('people', { namespace: 'peopleState' })
  people

  created() {
    this.$store.commit('appState/setloading', true)
    this.getdata()

    if (this.image) {
      this.getBackgroundImage('people', this.image, 'jpg')
    }
  }

  // Methods
  async getdata() {
    // we receive the main person data through the store through `TvFindPerson` mixin

    // if the store is empty we return to the people page
    if (isEmpty(this.people) || !isArray(this.people)) {
      // return to people page
      this.$router.push({ name: 'people' })
    }

    if (!isEmpty(this.people)) {
      // get species info
      const { name: species } = await this.$nuxt.$api.get(
        this.character.species
      )
      this.species = await species

      // get planet info
      const planet = await this.$nuxt.$api.get(this.character.homeworld)
      this.planet = await planet

      if (planet) {
        this.getBackgroundImage('planets', planet.name, 'jpg', 'second')
      }

      // get starship info
      const starships = []
      this.character.starships.forEach(async val =>
        starships.push(await this.$nuxt.$api.get(val))
      )
      this.starships = starships
    }

    this.$store.commit('appState/setloading', false)
  }

  getImageName(name) {
    if (name) {
      return name.replace(/\s/g, '_').toLowerCase()
    }
  }
}
</script>

<style lang="postcss">
.tv-person {
  &__wrapper {
    background-color: var(--background-color-transparent);
    border-radius: var(--border-radius);
    padding: 20px;
  }

  &__starships {
    &--image {
      max-width: 50%;
    }
  }

  &__planets {
    &--image {
      max-width: 50%;
      margin-bottom: 50px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat !important;
    background-size: cover;

    &--placeholder {
      height: 80%;
      background-position-x: -10px;
    }
  }
}
</style>
