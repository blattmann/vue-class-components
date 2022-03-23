<template>
  <div>
    <tv-spinner v-if="!character" />
    <v-card v-else>
      <v-card-title>
        <span class="text-h5">
          Edit <strong>{{ character.name }}</strong>
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="character.hair_color"
                label="Hair color"
                hint="Character hair color"
                persistent-hint
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="character.eye_color"
                label="Eye color"
                hint="Character eye color"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="character.height"
                label="Height"
                hint="Character height"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="character.mass"
                label="Mass"
                hint="Character mass"
                persistent-hint
              />
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog('close')">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="closeDialog('save')">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// Core
import Component, { mixins } from 'vue-class-component'

// Mixins
import TvLoading from '@/mixins/loading'
import TvFindPerson from '@/mixins/findPerson'

// Component imports
import TvSpinner from '@/components/spinner/Spinner'

/*
 * @name - TvEditPerson
 * @descrition - Form to edit a person
 * @decorator - @State
 * @type - Sate<T>
 * @param - namespace: string - peopleState
 */
@Component({
  props: {
    person: {
      type: String,
      default: ''
    }
  },
  components: {
    TvSpinner
  }
})
export default class TvEditPerson extends mixins(TvLoading, TvFindPerson) {
  updatePerson() {
    // create payload
    const payload = {}
    payload.personName = this.person
    payload.personObject = this.character
    // update store
    this.$store.commit('peopleState/updatePeople', payload)
  }

  closeDialog(variant) {
    if (variant === 'save') {
      this.updatePerson()
    }

    // emit
    this.$nuxt.$emit('show-modal')
  }
}
</script>
