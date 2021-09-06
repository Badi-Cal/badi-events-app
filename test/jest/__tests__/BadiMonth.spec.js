import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { BadiMonth } from 'components'
import Quasar from '../utils'

import { DateTime } from 'luxon'
import { BadiDate } from 'badidate'

describe('CalendarMonth', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component prop object', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(BadiMonth, {
        LocalVue,
        propsData: {
          startDate: new BadiDate(DateTime.local())
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('should accept valid prop types', () => {
      const vm = wrapper.vm
      const badidate = new BadiDate(DateTime.local())

      expect(vm.startDate instanceof BadiDate).toBe(true)
      expect(vm.startDate.format()).toBe(badidate.format())
    })
  })
})
