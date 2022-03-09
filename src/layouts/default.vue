<template>
  <v-app role="application">
    <main-view role="main" />
  </v-app>
</template>

<script>
// Core
import Vue from 'vue'
import Component from 'vue-class-component'

// Components
import MainView from './MainView'

/**
 *  @desc - Default App Layout
 *
 *  @author Front End Dev @Certipath
 *
 *  Mon Feb 24 13:15:38 EST 2020
 */
@Component({
  components: {
    MainView
  }
})
export default class TvDefaultLayout extends Vue {}
</script>
