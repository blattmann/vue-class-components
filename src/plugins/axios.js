// setting the base API URL for $axios on app load
// this runs before auth plugin.
export default async function({ $axios, $auth, store }) {
  const protocol = window.location.protocol
  const hostname = window.location.hostname
  const port = window.location.port
  const url = `${protocol}//${hostname}:${port}/config.json`
  const config = await $axios.$get(url)
  $axios.defaults.baseURL = config.API_URL
}
