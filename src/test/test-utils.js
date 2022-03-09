import { getModule, VuexModule } from 'vuex-module-decorators'
import { isEmpty, isEqual, cloneDeep } from 'lodash'

export function stateDiff(initialState, storeModule) {
  if (!storeModule.state) {
    return null
  }

  const objectCopy = cloneState(storeModule)

  const result = Object.keys(initialState).reduce((diff, key) => {
    if (!objectCopy.hasOwnProperty(key)) {
      diff[key] = initialState[key]
    } else if (isEqual(initialState[key], objectCopy[key])) {
      delete diff[key]
    }
    return diff
  }, objectCopy)

  if (isEmpty(result)) {
    return null
  }

  return result
}

export function cloneState(storeModule) {
  return Object.keys().reduce((state, key) => {
    // The store must be cast as indexable to get the value.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state[key] = cloneDeep(storeModule[key]) // NOSONAR
    return state
  }, {})
}
