import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { DaykeepCalendar } from '../../../component/quasar'
import Quasar from '../utils'

import DateTime from 'luxon/src/datetime'

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
      expect(vm.$data.workingDate instanceof Date).toBe(true)
      expect(vm.workingDateTime instanceof DateTime).toBe(true)

      const date = DateTime.fromJSDate(new Date())
      expect(vm.workingDateTime.toLocaleString()).toBe(date.toLocaleString())
    })
  })
})
