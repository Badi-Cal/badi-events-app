import { shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { BadiCalendar } from '../../../component/quasar'
import Quasar from '../utils'

import { DateTime } from 'luxon'
import BadiDate from '../../../utils/badidate'

// default module is on named default property of export object
import CalendarTemplateMixin, { spyEventsHandling } from 'mixins/template/Calendar'
jest.mock('mixins/template/Calendar')

describe('BadiCalendar', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(BadiCalendar, {
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

    it('should set up event handling', () => {
      const vm = wrapper.vm
      expect(typeof vm.setupEventsHandling).toBe('function')
      expect(spyEventsHandling).toHaveBeenCalled()
    })
  })

  describe('component data object', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(BadiCalendar, {
        LocalVue,
        propsData: {
          startDate: new Date()
        },
        stubs: ['router-link'],
        mixins: [CalendarTemplateMixin.default]
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('should create correct Badi date', () => {
      const vm = wrapper.vm
      expect(vm.$data.workingDate instanceof Date).toBe(true)

      const datetime = DateTime.fromJSDate(new Date())
      const myBadiDate = new BadiDate(datetime)

      expect(vm.workingDateBadi.format()).toBe(myBadiDate.format())
    })
  })
})
