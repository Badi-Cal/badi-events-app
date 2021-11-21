import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { CalendarMonth } from 'components'
import Quasar from '../utils'

import { DateTime } from 'luxon'

describe('CalendarMonth', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component prop object', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(CalendarMonth, {
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
