<template>
  <div>
    <tv-navigation />
    <template v-if="loading">
      <tv-spinner />
    </template>

    <template v-else>
      <h1>People</h1>
      <v-container class="pa-4 text-center">
        <v-row class="fill-height" align="center" justify="left">
          <template v-for="item in people">
            <v-col :key="item.name" cols="12" md="4">
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
                      <p class="ml-3 mt-3 subheading text-left">
                        {{ item.name }}
                      </p>
                      <div>
                        <p class="ml-3 text-body-1 font-weight-bold text-left">
                          Hair color: {{ item.hair_color }}
                        </p>
                        <p class="ml-3 text-body-1 font-weight-bold text-left">
                          Eye color: {{ item.eye_color }}
                        </p>
                        <p class="mr-3 text-body-1 font-weight-bold text-right">
                          <v-btn elevation="2" @click="editItem(item.name)">
                            Edit
                          </v-btn>
                        </p>
                      </div>
                    </v-row>
                  </v-card-title>
                </v-card>
              </v-hover>
            </v-col>
          </template>
        </v-row>
      </v-container>
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

// API
import getPeople from '@/composables/api/getPeople'

// Component imports
import TvNavigation from '@/components/navigation/Navigation'
import TvSpinner from '@/components/spinner/Spinner'

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
  layout: 'default',
  components: {
    TvNavigation,
    TvSpinner
  }
})
export default class TvIndex extends mixins(TvLoading) {
  // Component data
  timeout = null
  transparent = 'rgba(255, 255, 255, 0)'

  @State('People', { namespace: 'peopleState' })
  people

  async created() {
    this.$store.commit('appState/setloading', true)

    const obj = {
      axios: this.$axios
    }

    // getPeople API call
    await getPeople(obj).then(response => {
      if (response) {
        // console.log('response: ', response)
        // Store response
        this.$store.commit('peopleState/setPeople', response)
      } else {
        console.warn('No data available.')
      }

      this.$store.commit('appState/setloading', false)
    })
  }

  mounted() {
    this.setTimeOutClose()
  }

  beforeDestroy() {
    clearTimeout(this.timeout)
  }

  // Component method
  setTimeOutClose() {
    this.timeout = setTimeout(() => {
      // Handle loading
      this.$store.commit('appState/setloading', false)
    }, 500)
  }

  editItem(item) {
    console.log(item)
    this.$router.push('/')
  }
}
</script>

<style lang="postcss">
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}
</style>
