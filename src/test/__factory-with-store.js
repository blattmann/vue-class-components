import Vuex from 'vuex'
import {
  createLocalVue,
  mount,
  config,
  VueClass,
  shallowMount
} from '@vue/test-utils'
import VisitorsViewModule from '@/store/modules/ui/visitorsViewState'
import AppModule from '@/store/modules/totalState'

import { getModule } from 'vuex-module-decorators'
import { provideVuex, provide } from 'provide-consume-decorator'
import { Component, Vue } from 'nuxt-property-decorator'

export default (VueComponent, props, attrs, store, mountedComponents) => {
  @Component
  class VueComponentMock extends VueComponent {}

  const localVue = createLocalVue()
  localVue.use(Vuex)

  return shallowMount(VueComponentMock, {
    props,
    attrs,
    store,
    localVue,
    components: {
      mountedComponents
    }
  })
}
