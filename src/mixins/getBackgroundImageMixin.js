// Core
import Vue from 'vue'
import Component from 'vue-class-component'

/*
 * @name - TvGetBackgroundImageMixin
 * @description - Handles the major API calls
 */
@Component
export default class TvGetBackgroundImageMixin extends Vue {
  // Data
  fallbackImage = this.$getImage('various', 'placeholder') // fallback image
  backgroundImage = this.fallbackImage
  backgroundImageSecond = this.fallbackImage
  error = null

  getBackgroundImage(folder, image, format, variant = 'first') {
    const theImage = this.$getImage(folder, this.$getImageName(image), format)

    this.$axios
      .get(theImage)
      .then(response => {
        if (variant === 'first') {
          this.backgroundImage = theImage
        }
        if (variant === 'second') {
          this.backgroundImageSecond = theImage
        }
      })
      .catch(error => {
        // console.error(error)
        this.error = error
      })
  }
}
