import { createWrapper, shallowMount, mount, config } from '@vue/test-utils'
import Vue from 'vue'
import { CalendarHeaderNav } from 'templates/common'
import Quasar from '../utils'

import { DateTime } from 'luxon'

describe('CalendarHeaderNav', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  // set up config
  config.provide['moveTimePeriodEmit'] = () => 'moveTimePeriodEmit'

  describe('component mounted', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(CalendarHeaderNav, {
        LocalVue
      })
    })

    afterEach(() => {
      // IMPORTANT: Clean up the component instance
      wrapper.destroy()
    })

    it('should be a Vue instance', () => {
      const instance = wrapper.findComponent(CalendarHeaderNav)
      expect(instance.exists()).toBe(true)
    })
  })

  describe('component methods', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(CalendarHeaderNav, {
        LocalVue,
        propsData: {
          workingDate: DateTime.now(),
          timePeriodUnit: 'month'
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('moveTimePeriod - should return new date route params', () => {
      const vm = wrapper.vm
      const fixture = {
        unitType: 'month',
        amount: 1
      }
      let paramObj = {}
      paramObj[fixture.unitType] = fixture.amount

      const testDate = vm.$props.workingDate.plus(paramObj)
      const testParams = new vm.RouteParams(
        testDate.year,
        testDate.month,
        testDate.day
      )
      const result = vm.moveTimePeriod(fixture.unitType, fixture.amount)

      expect(result).toEqual(testParams)
    })
  })
})
