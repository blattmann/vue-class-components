<template>
  <v-container fluid>
    <!-- Error Text -->
    <v-row justify="center" class="tv-layout__error ">
      <!-- 404 Error -->
      <h1
        v-if="error.statusCode === 404"
        :id="idPrefix + 'error-404'"
        class="headline"
      >
        {{ pageNotFound }}
      </h1>
      <!-- 404 Error -->

      <!-- Other Error -->
      <h1 v-else :id="idPrefix + 'error'">
        {{ otherError }}
      </h1>
      <!-- End Other Error -->
    </v-row>
    <!-- Error Text -->

    <!-- Home Page Link -->
    <v-row justify="center">
      <NuxtLink :id="idPrefix + 'link-home-page'" to="/">
        Home page
      </NuxtLink>
    </v-row>
    <!-- End Home Page Link -->
  </v-container>
</template>

<script>
// Core
import Vue from 'vue'
import Component from 'vue-class-component'

/**
 *  @desc - App Error Layout
 *
 *  @author Front End Dev @Certipath
 *
 *  Thu Aug 27 14:53:03 EDT 2020
 */
@Component({
  props: {
    error: {
      type: Object,
      default: null
    }
  }
})
export default class TvErrorLayout extends Vue {
  /*
   * @name - layout
   * @descrition -
   */
  layout = 'empty'

  /*
   * @name - idPrefix
   * @descrition -
   */
  idPrefix = 'TvErrorLayout-'

  /*
   * @name - pageNotFound
   * @descrition -
   */
  pageNotFound = '404 Not Found'

  /*
   * @name -otherError
   * @descrition -
   */
  otherError = 'An error occurred'

  /*
   * @name - get head
   * @descrition -
   */
  get head() {
    return this.error.statusCode === 404 ? this.pageNotFound : this.otherError
  }
}
</script>
