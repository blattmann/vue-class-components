import { createLocalVue, mount } from '@vue/test-utils'
import Component from 'vue-class-component'

export default (VueComponent, props, attrs) => {
  @Component({})
  class VueComponentMock extends VueComponent {}

  const localVue = createLocalVue()

  const authMock = {
    loggedIn: true,
    user: {
      UserFullName: ''
    }
  }

  return mount(VueComponentMock, {
    mocks: {
      $auth: authMock
    },
    props,
    attrs,
    localVue
  })
}
