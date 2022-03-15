/*
 * @name - getSwapiPeople
 * @descrition -
 */
const getSwapiPeople = async obj => {
  const data = await obj.axios
    .get(`https://swapi.dev/api/people/?format=json`, obj.params)
    .catch(error => {
      console.error('getPeople API error: ', error)
    })

  // If success
  if (data?.status === 200) {
    return data.data.results
  }
}

export default getSwapiPeople
