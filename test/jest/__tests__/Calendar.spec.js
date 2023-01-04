import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { DaykeepCalendar } from '../../../component/quasar'
import Quasar from '../utils'

import { DateTime } from 'luxon'

describe('Calendar', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component mounted', () => {
    let spyEventsHandling,
      wrapper

    const buildWrapper = (options = {}) => {
      const vm0 = new LocalVue({
        extends: DaykeepCalendar
      })
      spyEventsHandling = jest.spyOn(vm0, 'setupEventsHandling')
      vm0.$mount()
      wrapper = createWrapper(vm0, {
        options
      })
    }

    beforeEach(() => {
      buildWrapper()
    })

    afterEach(() => {
    // IMPORTANT: Clean up the component instance
      wrapper.destroy()
      spyEventsHandling.mockRestore()
    })

    it('should be a Vue instance', () => {
      const instance = wrapper.findComponent(DaykeepCalendar)
      expect(instance.exists()).toBe(true)
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
      wrapper = shallowMount(DaykeepCalendar, {
        LocalVue,
        propsData: {
          startDate: new Date()
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('should create correct working date', () => {
      const vm = wrapper.vm
      expect(vm.$props.startDate instanceof Date).toBe(true)
      expect(vm.workingDate instanceof DateTime).toBe(true)

      const date = DateTime.fromJSDate(new Date())
      expect(vm.workingDate.toLocaleString()).toBe(date.toLocaleString())
    })
  })

  describe('component methods', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(DaykeepCalendar, {
        LocalVue,
        propsData: {
          startDate: new Date()
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('moveTimePeriod - should set the workingDate computed property', () => {
      const vm = wrapper.vm
      const fixture = {
        unitType: 'month',
        amount: 1
      }
      let paramObj = {}
      paramObj[fixture.unitType] = fixture.amount

      const testDate = DateTime.fromJSDate(vm.$props.startDate).plus(paramObj)
      vm.moveTimePeriod(fixture)

      expect(vm.$data.workingDate.toLocaleString()).toBe(testDate.toLocaleString())
    })
  })
})
