import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { CalendarMonth } from 'components'
import Quasar from '../utils'

describe('CalendarMonth', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component mounted', () => {
    let wrapper

    const buildWrapper = (options = {}) => {
      const vm0 = new LocalVue({
        extends: CalendarMonth
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
      const instance = wrapper.findComponent(CalendarMonth)
      expect(instance.exists()).toBe(true)
    })
  })

  describe('component prop object', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(CalendarMonth, {
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
