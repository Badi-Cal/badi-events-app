import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import { DateTime } from 'luxon'
import Vue from 'vue'
import { DaykeepCalendarMultiDay } from '../../../component/quasar'
import Quasar from '../utils'

describe('CalendarMultiDay', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component mounted', () => {
    let wrapper

    const buildWrapper = (options = {}) => {
      const vm0 = new LocalVue({
        extends: DaykeepCalendarMultiDay,
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
      const instance = wrapper.findComponent(DaykeepCalendarMultiDay)
      expect(instance.exists()).toBe(true)
    })
  })

  describe('component data object', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(DaykeepCalendarMultiDay, {
        LocalVue,
        propsData: {
          startDate: DateTime.local()
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('should create correct working date', () => {
      const vm = wrapper.vm
      expect(vm.$data.workingDate instanceof DateTime).toBe(true)

      const date = DateTime.fromJSDate(new Date())
      expect(vm.workingDate.toLocaleString()).toBe(date.toLocaleString())
    })
  })

  describe('component prop object', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(DaykeepCalendarMultiDay, {
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
