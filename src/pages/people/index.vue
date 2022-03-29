<template>
  <div>
    <h1>People</h1>
    <v-container class="tv-people text-center">
      <v-row class="fill-height" align="center">
        <template v-for="item in people">
          <v-col :key="item.name" cols="12" md="6" class="pa-0 pb-6 pa-md-6">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                :class="['tv-people__card', { 'on-hover': hover }]"
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
                        <v-col cols="4" md="3">
                          <tv-image :image-name="item.name" folder="people" />
                        </v-col>
                        <v-col cols="8" md="5">
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
import TVGetDataMixin from '@/mixins/getDataMixin'

// Component imports
import TvEditPerson from '@/components/dialog/editPerson.vue'
import TvSpinner from '@/components/spinner/Spinner'
import TvImage from '@/components/image/Image'

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
    TvEditPerson,
    TvImage
  }
})
export default class TvPeople extends mixins(
  TvLoading,
  TvNavigationHelper,
  TVGetDataMixin
) {
  // Data
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
  retrieveData() {
    if (isEmpty(this.people)) {
      // getPeople API call (in getDataMixin)
      this.getPeople()
    }
  }

  editItem(item) {
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

  &__card {
    display: flex;
    flex-direction: column;

    @mixin res-lg {
      min-height: 250px;
      max-height: 500px;
      overflow-y: scroll;
    }
  }

  &__dialog {
    background-color: #fff;

    .v-card {
      width: 100%;
      box-shadow: none;
    }
  }

  .v-card {
    transition: opacity 0.4s ease-in-out;

    &:not(.on-hover) {
      opacity: 0.8;
    }
  }

  .v-image {
    max-width: 50%;
  }
}
</style>
