<template>
  <div>
    <template v-if="loading">
      <tv-spinner />
    </template>

    <template v-if="!loading && item">
      <main class="tv-starship__wrapper">
        <v-container class="pa-4">
          <h1 class="pb-10 text-h2 text-center">
            {{ item.name }}
          </h1>
          <div class="tv-starship__container">
            <v-row no-gutters>
              <v-col cols="12" sm="6" md="5">
                <div
                  :style="{
                    backgroundImage: `url(${backgroundImage})`
                  }"
                  class="tv-starship__image"
                />
              </v-col>
              <v-col cols="6" md="7">
                <div class="ml-5">
                  <p><strong>Name:</strong> {{ item.name }}</p>
                  <p><strong>Model:</strong> {{ item.model }}</p>
                  <p><strong>Manufacturer:</strong> {{ item.manufacturer }}</p>

                  <p><strong>MGLT:</strong> {{ item.MGLT }}</p>
                  <p>
                    <strong>Cargo capacity:</strong> {{ item.cargo_capacity }}
                  </p>
                  <p><strong>Consumables:</strong> {{ item.consumables }}</p>
                  <p>
                    <strong>Cost in credits:</strong> {{ item.cost_in_credits }}
                  </p>
                  <p><strong>Crew:</strong> {{ item.crew }}</p>
                  <p>
                    <strong>Hyperdeive rating:</strong>
                    {{ item.hyperdrive_rating }}
                  </p>
                  <p><strong>Length:</strong> {{ item.length }}</p>
                  <p>
                    <strong>Speed:</strong>
                    {{ item.max_atmosphering_speed }} km/h [{{
                      $convertSpeed(item.max_atmosphering_speed)
                    }}
                    mph]
                  </p>
                  <p><strong>Passengers:</strong> {{ item.passengers }}</p>
                  <p>
                    <strong>Starship class:</strong> {{ item.starship_class }}
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
import TvFindStarship from '@/mixins/findStarship'
import TvGetBackgroundImageMixin from '@/mixins/getBackgroundImageMixin'

// Component imports
import TvSpinner from '@/components/spinner/Spinner'

/**
 *  TvStarship
 *
 *  @desc - SWAPI Starship Page
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
export default class TvStarship extends mixins(
  TvLoading,
  TvNavigationHelper,
  TvFindStarship,
  TvGetBackgroundImageMixin
) {
  // Data
  starship = this.$nuxt.$route.params.starships
  image = this.starship // needed for the background image @ `getBackgroundImageMixin`

  // starships state
  @State('starships', { namespace: 'starshipsState' })
  starships

  created() {
    this.$store.commit('appState/setloading', false)

    // if the store is empty we return to the people page
    if (isEmpty(this.starships) || !isArray(this.starships)) {
      // return to people page
      this.$router.push({ name: 'starships' })
    }

    if (this.image) {
      this.getBackgroundImage('starships', this.image, 'png')
    }

    // TODO:
    // Iterate over pilots & films
  }
}
</script>

<style lang="postcss">
:root {
  --border-radius: 4px;
  --background-color-transparent: rgba(255, 255, 255, 0.8);
}

.tv-starship {
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
  }
}
</style>
