/**
 *  @name - App
 *
 *  @desc - On route change let our app state know so we can close the mobile menu between route changes
 *
 *  @author - Chip Moeser
 *
 */
export default () => {
  // We want menu mobile to close when changing page.
  window.onNuxtReady(app => {
    app.$nuxt.$on('routeChanged', (to, from) => {
      // foo, placeholder for route change functions. Will be used eventaully.
    })
  })
}
