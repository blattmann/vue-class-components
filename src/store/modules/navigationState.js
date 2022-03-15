// Vuex
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

const navigationArray = [
  {
    title: 'Home',
    url: '/'
  },
  {
    title: 'People',
    url: '/people'
  },
  {
    title: 'Planets',
    url: '/planets'
  }
]

/**
 *  @desc -
 *
 *  @author Front End Dev @Certipath
 *
 * Mar 09 2022 16:00:00
 */
@Module({
  stateFactory: true,
  namespaced: true,
  name: 'navigationState'
})
export default class NavigationModule extends VuexModule {
  @Mutation
  init(data) {
    this.Navi = data
  }

  @Mutation
  setActivePage(data) {
    this.Navi.ActivePage = data
  }

  navigationInitialState = {
    ActivePage: '',
    Navigation: navigationArray
  }

  Navi = { ...this.navigationInitialState }
}
