// Core
import Vue from 'vue'
import Component from 'vue-class-component'

// You can declare mixins as the same style as components.
@Component
export default class TvNavigationHelper extends Vue {
  /*
   * @name - TvNavigationHelper
   * @descrition - Binds to the current page in the navigationState
   * @decorator - @State
   * @type - Sate<T>
   * @param - namespace: string - navigationState
   */

  // Component data
  route = this.$nuxt.$route
  routeParams = this.route.params

  mounted() {
    // store current page
    this.$store.commit('navigationState/setActivePage', this.getActiveItem())
    // handle backlink
    this.$store.commit('navigationState/setBackLink', this.setBacklink())
  }

  setBacklink() {
    if (
      Object.prototype.toString.call(this.routeParams) === '[object Object]' &&
      JSON.stringify(this.routeParams) === '{}'
    ) {
      return false
    }
    return true
  }

  // Component methods
  getActiveItem() {
    return this.$nuxt.$route.path
  }
}
