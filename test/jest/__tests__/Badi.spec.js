import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { BadiCalendar } from '../../../component/quasar'
import Quasar from '../utils'

import { DateTime } from 'luxon'
import BadiDate from '../../../utils/badidate'

describe('BadiCalendar', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component mounted', () => {
    let spyEventsHandling,
      wrapper

    const buildWrapper = (options = {}) => {
      const vm0 = new LocalVue({
        extends: BadiCalendar
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

    it('should set up event handling', () => {
      const vm = wrapper.vm
      expect(typeof vm.setupEventsHandling).toBe('function')
      expect(spyEventsHandling).toBeCalledTimes(1)
    })
  })

  describe('component data object', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(BadiCalendar, {
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
      expect(vm.workingDateTime instanceof DateTime).toBe(true)

      const datetime = DateTime.fromJSDate(new Date())
      const myBadiDate = new BadiDate(datetime)

      expect(vm.workingDateBadi.format()).toBe(myBadiDate.format())
    })
  })
})
