export const peopleApi = getData => ({
  async getPerson(id) {
    try {
      const response = await getData(`people/${id}/`)
      if (response.ok && response.status === 200) {
        const data = await response.json()
        return { url: response.url, ...data }
      }
      throw new Error(response.statusText)
    } catch (error) {
      return error
    }
  },

  async getPeople() {
    try {
      const response = await getData(`people/`)
      if (response.ok && response.status === 200) {
        const data = await response.json()
        return { url: response.url, ...data }
      }
      throw new Error(response.statusText)
    } catch (error) {
      return error
    }
  },

  async searchPeople(query) {
    try {
      const response = await getData(`people/?search=${encodeURI(query)}`)
      if (response.ok && response.status === 200) {
        const data = await response.json()
        return { url: response.url, ...data }
      }
      throw new Error(response.statusText)
    } catch (error) {
      console.error('searchPeople error: ', error)
      return error
    }
  }
})
