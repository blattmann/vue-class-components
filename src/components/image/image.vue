<template>
  <div class="tv-image">
    <v-img
      :src="$getImage(folder, $getImageName(imageName), 'jpg')"
      :lazy-src="$getImage('various', 'placeholder', 'jpg')"
      max-width="500"
      max-height="300"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5" />
        </v-row>
      </template>
    </v-img>
  </div>
</template>

<script>
// Core
import Vue from 'vue'
import Component from 'vue-class-component'

/*
 * @name - TvImage
 * @descrition - Show image
 */
@Component({
  props: {
    imageName: {
      type: String,
      default: '',
      required: true
    },
    folder: {
      type: String,
      default: '',
      required: true
    }
  }
})
export default class TvImage extends Vue {}
</script>

<style lang="postcss">
.tv-image {
  .v-image {
    max-width: 50%;
  }
}
</style>
