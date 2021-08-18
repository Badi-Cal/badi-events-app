import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { CalendarMonthInner } from 'components'
import Quasar from '../utils'

import DateTime from 'luxon/src/datetime'

describe('CalendarMonthInner', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component mounted', () => {
    let wrapper

    const buildWrapper = (options = {}) => {
      const vm0 = new LocalVue({
        extends: CalendarMonthInner
      })
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
    })

    it('should be a Vue instance', () => {
      const instance = wrapper.findComponent(CalendarMonthInner)
      expect(instance.exists()).toBe(true)
    })
  })

  describe('component methods', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(CalendarMonthInner, {
        LocalVue,
        propsData: {
          startDate: DateTime.local()
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('generateCalendarCellArray - should return correct beginning of month', () => {
      const vm = wrapper.vm

      const weekday = DateTime.fromJSDate(new Date()).startOf('month').weekday
      const weekArray = vm.generateCalendarCellArray()

      expect(weekArray.length).toBeGreaterThan(1)
      expect(weekArray[0][0].dayNumber).toBe(weekday)
    })
  })
})
