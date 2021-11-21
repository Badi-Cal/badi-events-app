import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import { DateTime } from 'luxon'
import Vue from 'vue'
import { DaykeepCalendarAgenda } from '../../../component/quasar'
import Quasar from '../utils'

describe('CalendarAgenda', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component mounted', () => {
    let wrapper

    const buildWrapper = (options = {}) => {
      const vm0 = new LocalVue({
        extends: DaykeepCalendarAgenda,
        propsData: {
          startDate: DateTime.local()
        }
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
      const instance = wrapper.findComponent(DaykeepCalendarAgenda)
      expect(instance.exists()).toBe(true)
    })
  })

  describe('component prop object', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(DaykeepCalendarAgenda, {
        LocalVue,
        propsData: {
          startDate: DateTime.local()
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('should accept valid prop types', () => {
      const vm = wrapper.vm
      expect(vm.$props.startDate instanceof DateTime).toBe(true)
    })
  })
})
