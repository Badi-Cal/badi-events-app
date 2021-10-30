import { createWrapper, shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import { BadiMonthInner } from 'components'
import Quasar from '../utils'

import { DateTime } from 'luxon'
import BadiDate from '../../../utils/badidate'

describe('CalendarMonthInner', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  describe('component methods', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(BadiMonthInner, {
        LocalVue,
        propsData: {
          startDate: new BadiDate(DateTime.local())
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('getCalendarCellArray - should return correct beginning of month', () => {
      const vm = wrapper.vm
      const startDate = vm.$props.startDate

      const badidate = new BadiDate(DateTime.local())
      const badidate1 = new BadiDate({
        year: badidate.year,
        month: badidate.month,
        day: 1
      })
      const dayObject = {
        dateObject: badidate1,
        year: badidate1.year,
        month: badidate1.month,
        date: badidate1.day,
        dayName: badidate1.format('WW'),
        dayNumber: badidate1.weekday
      }

      const weekArray = vm.getCalendarCellArray(startDate.month, startDate.year)

      expect(weekArray.length).toBeGreaterThan(1)
      expect(weekArray[0][0]).toEqual(dayObject)
    })
  })
})
