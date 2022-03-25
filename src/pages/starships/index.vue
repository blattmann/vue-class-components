<template>
  <div>
    <h1>Starships</h1>
    <v-container class="tv-starships text-center">
      <v-row class="fill-height" align="center">
        <template v-for="item in starships">
          <v-col :key="item.name" cols="12" md="6" class="pa-0 pb-6 pa-md-6">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                :class="['tv-starships__card', { 'on-hover': hover }]"
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
                            Model: {{ item.model }}
                          </p>
                          <p
                            class="ml-3 text-body-1 font-weight-bold text-left"
                          >
                            Manufacturer: {{ item.manufacturer }}
                          </p>
                          <p
                            class="ml-3 text-body-1 font-weight-bold text-left"
                          >
                            Speed: {{ item.max_atmosphering_speed }} km/h [{{
                              $convertSpeed(item.max_atmosphering_speed)
                            }}
                            mph]
                          </p>
                          <p
                            class="ml-3 text-body-1 font-weight-bold text-left"
                          >
                            <nuxt-link
                              :to="`starships/${encodeURIComponent(item.name)}`"
                            >
                              Details
                            </nuxt-link>
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
  </div>
</template>

<script>
// Core
import Component, { mixins } from 'vue-class-component'
// import { Watch } from 'vue-property-decorator'
import { isEmpty } from 'lodash'

// Vuex
import { State } from 'vuex-class'

// Mixins
import TvLoading from '@/mixins/loading'
import TvNavigationHelper from '@/mixins/navigationHelper'
import getDataMixin from '@/mixins/getDataMixin'

// Component imports
import TvSpinner from '@/components/spinner/Spinner'

/**
 *  TvStarships
 *
 *  @desc - SWAPI Starships Page
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
export default class TvStarships extends mixins(
  TvLoading,
  TvNavigationHelper,
  getDataMixin
) {
  // Data
  starships = ''
  speed = []

  @State('starships', { namespace: 'starshipsState' })
  starships

  created() {
    // get data
    this.retrieveData()
  }

  // Methods
  retrieveData() {
    if (isEmpty(this.starships)) {
      // getStarshipsAPI call
      this.getStarships()
    }

    // getStarships API call
    this.getStarships()
  }
}
</script>

<style lang="postcss">
.tv-starships {
  &__button {
    position: absolute;
    bottom: 12px;
    right: 24px;
  }

  &__card {
    display: flex;
    flex-direction: column;

    /* unfortunately, I cannot get mixins to work */
    /* @mixin res-lg {
      min-height: 500px;
      max-height: 500px;
      overflow-y: scroll;
    } */

    /* does not work with CSS vars :( */
    @media (min-width: 960px) {
      min-height: 400px;
      max-height: 500px;
      overflow-y: scroll;
    }
  }

  .v-card {
    transition: opacity 0.4s ease-in-out;

    &:not(.on-hover) {
      opacity: 0.8;
    }
  }
}
</style>
