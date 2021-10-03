import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import { DateTime } from 'luxon'
import Vue from 'vue'
import { CalendarDayLabels } from 'templates/common'
import Quasar from '../utils'

describe('CalendarDayLabels', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component data object', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(CalendarDayLabels, {
        LocalVue,
        propsData: {
          startDate: DateTime.local()
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('should make Sunday first day of the week', () => {
      const vm = wrapper.vm
      const firstDate = vm.$data.weekDateArray[0]
      expect(firstDate instanceof DateTime).toBe(true)
      expect(firstDate.weekday).toBe(7)
    })
  })
})
