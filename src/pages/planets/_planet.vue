<template>
  <div>
    <template v-if="loading">
      <tv-spinner />
    </template>

    <template v-if="!loading && item">
      <main class="tv-planet__wrapper">
        <v-container class="pa-4">
          <h1 class="pb-10 text-h2 text-center">
            {{ item.name }}
          </h1>
          <div class="tv-planet__container">
            <v-row no-gutters>
              <v-col cols="12" sm="6" md="5">
                <div
                  :style="{
                    backgroundImage: `url(${backgroundImage})`
                  }"
                  :class="[
                    'tv-planet__image',
                    { 'tv-planet__image--placeholder': placeholderFirst }
                  ]"
                />
              </v-col>
              <v-col cols="6" md="7">
                <div class="ml-5">
                  <p><strong>Name:</strong> {{ item.name }}</p>
                  <p><strong>Terrain:</strong> {{ item.terrain }}</p>
                  <p><strong>Climate:</strong> {{ item.climate }}</p>
                  <p><strong>Population:</strong> {{ item.population }}</p>
                  <p><strong>Diameter:</strong> {{ item.diameter }}</p>
                  <p><strong>Gravity:</strong> {{ item.gravity }}</p>
                  <p>
                    <strong>Rotation period:</strong>
                    {{ item.rotation_period }}
                  </p>
                  <p>
                    <strong>Orbital period:</strong>
                    {{ item.orbital_period }}
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
import TvFindPlanet from '@/mixins/findPlanet'
import TvGetBackgroundImageMixin from '@/mixins/getBackgroundImageMixin'

// Component imports
import TvSpinner from '@/components/spinner/Spinner'

/**
 *  TvPlanet
 *
 *  @desc - SWAPI Planet Page
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
export default class TvPlanet extends mixins(
  TvLoading,
  TvNavigationHelper,
  TvFindPlanet,
  TvGetBackgroundImageMixin
) {
  // Data
  planet = this.$nuxt.$route.params.planet
  image = this.planet // needed for the background image @ `getBackgroundImageMixin`

  // planets state
  @State('planets', { namespace: 'planetsState' })
  planets

  created() {
    this.$store.commit('appState/setloading', true)

    // if the store is empty we return to the people page
    if (isEmpty(this.planets) || !isArray(this.planets)) {
      // return to people page
      this.$router.push({ name: 'planets' })
    }

    if (this.image) {
      this.getBackgroundImage('planets', this.image, 'jpg')
    }

    this.$store.commit('appState/setloading', false)
  }
}
</script>

<style lang="postcss">
.tv-planet {
  &__wrapper {
    background-color: var(--background-color-transparent);
    border-radius: var(--border-radius);
    padding: 20px;
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
