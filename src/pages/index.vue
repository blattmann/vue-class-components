<template>
  <v-container class="text-left">
    <v-row class="fill-height" align="center">
      <v-col cols="12" class="pa-0">
        <v-card>
          <v-card-title class="text-h6">
            <v-row
              class="tv-home__wrapper fill-height flex-column"
              justify="space-between"
            >
              <h1>SWAPI - The Stars Wars API</h1>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row
              class="tv-home__wrapper fill-height flex-column"
              justify="space-between"
            >
              <div class="tv-home__content">
                <h2 class="text-h3 pb-6">What is this?</h2>
                <p>
                  The Star Wars API is the world's first quantified and
                  programmatically-formatted set of Star Wars data.
                </p>
                <p>
                  After hours of watching films and trawling through content
                  online, we present to you all the People, Films, Species,
                  Starships, Vehicles and Planets from Star Wars.
                </p>
                <p>
                  We've formatted this data in JSON and exposed it to you in a
                  RESTish implementation that allows you to programmatically
                  collect and measure the data.
                </p>
                <p>
                  Check out the documentation to get started consuming swapi
                  data
                </p>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Core
import Component, { mixins } from 'vue-class-component'

// Mixins
import TvNavigationHelper from '@/mixins/navigationHelper'

/**
 *  TvIndex
 *
 *  @desc - SWAPI Main Page
 *
 *  @author Front End Dev @Certipath
 *
 *  Mon Mar 7 09:00:00 MST 2022
 */
@Component({
  layout: 'default'
})
export default class TvIndex extends mixins(TvNavigationHelper) {}
</script>

<style lang="postcss">
.tv-home {
  &__wrapper {
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    padding: 20px;
  }

  &__content {
    min-height: 300px;
    color: var(--text-color-default);
    font-size: var(--text-size-content);
  }
}
</style>
