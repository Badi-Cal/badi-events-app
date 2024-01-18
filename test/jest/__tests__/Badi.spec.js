import { shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import BadiCalendar from 'src/pages/Badi.vue'
import Quasar from '../utils'

import BadiDate from '../../../utils/badidate'

describe('BadiCalendar', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(BadiCalendar, {
        LocalVue,
        stubs: ['router-link']
      })
    })

    afterEach(() => {
      // IMPORTANT: Clean up the component instance
      wrapper.destroy()
    })

    it('should be a Vue instance', () => {
      const instance = wrapper.findComponent(BadiCalendar)
      expect(instance.exists()).toBe(true)
    })
  })

  describe('component data object', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(BadiCalendar, {
        LocalVue,
        propsData: {
          year: new BadiDate().year,
          month: new BadiDate().month,
          day: new BadiDate().day
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('should create correct Badi date', () => {
      const vm = wrapper.vm
      const testBadiDate = new BadiDate()
      expect(vm.startDateBadi).toStrictEqual(testBadiDate)
    })
  })
})
