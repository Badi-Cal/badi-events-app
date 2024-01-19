import { shallowMount, mount } from '@vue/test-utils'
import { DateTime } from 'luxon'
import Vue from 'vue'
import { CalendarMultiDay } from '../../../component/quasar'
import Quasar from '../utils'

describe('CalendarMultiDay', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(CalendarMultiDay, {
        LocalVue,
        provide: {
          moveTimePeriodEmit: () => 'moveTimePeriodEmit'
        }
      })
    })

    afterEach(() => {
    // IMPORTANT: Clean up the component instance
      wrapper.destroy()
    })

    it('should be a Vue instance', () => {
      const instance = wrapper.findComponent(CalendarMultiDay)
      expect(instance.exists()).toBe(true)
    })
  })

  describe('component prop object', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(CalendarMultiDay, {
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

    it('should make Sunday first day of the week array', () => {
      const vm = wrapper.vm
      const firstDate = vm.$data.weekDateArray[0]
      expect(firstDate instanceof DateTime).toBe(true)
      expect(firstDate.weekday).toBe(7)
    })
  })
})
