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
              <v-col cols="12" sm="6" md="4">
                <div
                  :style="{
                    backgroundImage: `url(${$getImage(
                      'people',
                      getImageName(character.name)
                    )})`
                  }"
                  class="tv-person__image"
                />
              </v-col>
              <v-col cols="6" md="8">
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
                <v-col cols="12" sm="6" md="4">
                  <div
                    :style="{
                      backgroundImage: `url(${$getImage(
                        'planets',
                        getImageName(planet.name),
                        'jpg'
                      )})`
                    }"
                    class="tv-person__image"
                  />
                </v-col>
                <v-col cols="6" md="8">
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
                      <p>
                        <img
                          :alt="item.name"
                          :src="$assetImage('starships', (i += 1), 2)"
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

// Vuex
import { State } from 'vuex-class'

// Mixins
import TvLoading from '@/mixins/loading'
import TvNavigationHelper from '@/mixins/navigationHelper'
import TvFindPerson from '@/mixins/findPerson'

// Component imports
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
    TvSpinner
  }
})
export default class TvPerson extends mixins(
  TvLoading,
  TvNavigationHelper,
  TvFindPerson
) {
  // Data
  person = this.$nuxt.$route.params.person
  species = null
  starships = null
  planet = null

  // people state
  @State('people', { namespace: 'peopleState' })
  people

  created() {
    this.$store.commit('appState/setloading', false)
    this.getdata()
  }

  // get person data
  async getdata() {
    // we receive the main person data through the store through `TvFindPerson` mixin

    // get species info
    const { name: species } = await this.$nuxt.$api.get(this.character.species)
    this.species = await species

    // get starship info
    const starships = []
    this.character.starships.forEach(async val =>
      starships.push(await this.$nuxt.$api.get(val))
    )
    this.starships = await starships

    // get planet info
    const planet = await this.$nuxt.$api.get(this.character.homeworld)
    this.planet = await planet
  }

  getImageName(name) {
    if (name) {
      return name.replace(/\s/g, '_').toLowerCase()
    }
  }
}
</script>

<style lang="postcss">
:root {
  --border-radius: 4px;
  --background-color-transparent: rgba(255, 255, 255, 0.8);
}

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
    height: 50vh;
    background-repeat: no-repeat !important;
  }
}
</style>
