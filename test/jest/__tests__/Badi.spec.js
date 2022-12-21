import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { BadiCalendar } from '../../../component/quasar'
import Quasar from '../utils'

import { DateTime } from 'luxon'
import BadiDate from '../../../utils/badidate'

// default module is on named default property of export object
// import CalendarEventMixin from 'mixins/code/CalendarEventMixin'
import CalendarTemplateMixin, { spyEventsHandling } from 'mixins/template/Calendar'
jest.mock('mixins/template/Calendar')

describe('BadiCalendar', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(BadiCalendar, {
        LocalVue,
        mixins: [CalendarTemplateMixin.default]
      })
      jest.clearAllMocks()
    })

    afterEach(() => {
    // IMPORTANT: Clean up the component instance
      wrapper.destroy()
    })

    it('should set up event handling', () => {
      const vm = wrapper.vm
      expect(typeof vm.setupEventsHandling).toBe('function')
      expect(spyEventsHandling).toBeCalledTimes(1)
    })
  })

  describe('component data object', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(BadiCalendar, {
        LocalVue,
        propsData: {
          startDate: new Date()
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('should create correct Badi date', () => {
      const vm = wrapper.vm
      expect(vm.startDate instanceof Date).toBe(true)

      const datetime = DateTime.fromJSDate(new Date())
      const myBadiDate = new BadiDate(datetime)

      expect(vm.workingDate.format()).toBe(myBadiDate.format())
    })
  })
})
