import { starshipsApi } from './starships'
import { planetsApi } from './planets'
import { peopleApi } from './people'

export const api = getData => ({
  ...peopleApi(getData),
  ...starshipsApi(getData),
  ...planetsApi(getData),

  async get(url) {
    try {
      const response = await fetch(url)
      if (response.ok && response.status === 200) {
        const data = await response.json()
        return { url: response.url, ...data }
      }
      throw new Error(response.statusText)
    } catch (error) {
      return error
    }
  }
})
