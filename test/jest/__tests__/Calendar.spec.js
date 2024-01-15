import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { GregorianCalendar } from '../../../component/quasar'
import Quasar from '../utils'

import { DateTime } from 'luxon'

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
      wrapper = mount(GregorianCalendar, {
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
      const instance = wrapper.findComponent(GregorianCalendar)
      expect(instance.exists()).toBe(true)
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
      wrapper = shallowMount(GregorianCalendar, {
        LocalVue,
        propsData: {
          startDate: new Date()
        },
        mixins: [CalendarTemplateMixin.default]
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('should create correct working date', () => {
      const vm = wrapper.vm
      expect(vm.$data.workingDate instanceof Date).toBe(true)
      expect(vm.workingDateGregorian instanceof DateTime).toBe(true)

      const date = DateTime.fromJSDate(new Date())
      expect(vm.workingDateGregorian.toLocaleString()).toBe(date.toLocaleString())
    })
  })

  describe.skip('component methods', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(GregorianCalendar, {
        LocalVue,
        propsData: {
          startDate: new Date()
        },
        mixins: [CalendarTemplateMixin.default]
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    // TODO: move test to CalenderHeader
    it('moveTimePeriod - should set the workingDateGregorian computed property', () => {
      const vm = wrapper.vm
      const fixture = {
        unitType: 'month',
        amount: 1
      }
      let paramObj = {}
      paramObj[fixture.unitType] = fixture.amount

      const testDate = DateTime.fromJSDate(vm.$props.startDate).plus(paramObj)
      vm.moveTimePeriod(fixture)

      expect(vm.workingDateGregorian.toLocaleString()).toBe(testDate.toLocaleString())
    })
  })
})
