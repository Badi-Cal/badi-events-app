import { shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { Calendar } from '../../../component/quasar'
import Quasar from '../utils'

// default module is on named default property of export object
import CalendarTemplateMixin, { spyEventsHandling } from 'mixins/template/Calendar'
jest.mock('mixins/template/Calendar')

describe('Calendar', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(Calendar, {
        LocalVue,
        stubs: ['router-link'],
        mixins: [CalendarTemplateMixin.default]
      })
    })

    afterEach(() => {
      // IMPORTANT: Clean up the component instance
      jest.clearAllMocks()
      wrapper.destroy()
    })

    it('should be a Vue instance', () => {
      const instance = wrapper.findComponent(Calendar)
      expect(instance.exists()).toBe(true)
    })

    it('should set up event handling', () => {
      const vm = wrapper.vm
      expect(typeof vm.setupEventsHandling).toBe('function')
      expect(spyEventsHandling).toHaveBeenCalled()
    })
  })
})
