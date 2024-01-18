import { shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import GregorianCalendar from 'src/pages/Gregorian.vue'
import Quasar from '../utils'

import { DateTime } from 'luxon'

describe('Calendar', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(GregorianCalendar, {
        LocalVue,
        stubs: ['router-link']
      })
    })

    afterEach(() => {
      // IMPORTANT: Clean up the component instance
      wrapper.destroy()
    })

    it('should be a Vue instance', () => {
      const instance = wrapper.findComponent(GregorianCalendar)
      expect(instance.exists()).toBe(true)
    })
  })

  describe('component data object', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(GregorianCalendar, {
        LocalVue,
        propsData: {
          year: DateTime.local().year,
          month: DateTime.local().month,
          day: DateTime.local().day
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('should create correct working date', () => {
      const vm = wrapper.vm

      const testDate = DateTime.now()
      expect(vm.startDateGregorian.toLocaleString()).toBe(testDate.toLocaleString())
    })
  })
})
