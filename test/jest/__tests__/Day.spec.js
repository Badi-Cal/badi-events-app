import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { DaykeepCalendarMultiDay } from '../../../component/quasar'
import Quasar from '../utils'

describe('Month', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component mounted', () => {
    let wrapper

    const buildWrapper = (options = {}) => {
      const vm0 = new LocalVue({
        extends: DaykeepCalendarMultiDay
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

  describe('component prop object', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(DaykeepCalendarMultiDay, {
        LocalVue,
        propsData: {
          startDate: new Date()
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('should accept valid prop types', () => {
      const vm = wrapper.vm
      expect(vm.$props.startDate instanceof Date).toBe(true)
    })
  })
})
