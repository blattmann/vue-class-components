// Core
import Vue from 'vue'
import Component from 'vue-class-component'

// Vuex
import { State } from 'vuex-class'

// You can declare mixins as the same style as components.
@Component
export default class TvLoading extends Vue {
  /*
   * @name - TvLoading
   * @descrition - Binds to the loading in the appState
   * @decorator - @State
   * @type - State<T>
   * @param - namespace: string - appState
   */
  @State('loading', { namespace: 'appState' })
  loading
}
