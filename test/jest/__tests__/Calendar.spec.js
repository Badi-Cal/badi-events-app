import { createWrapper, shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import { DaykeepCalendar } from '../../../component/quasar'
import Quasar from '../utils'

describe('Mounted Calendar', () => {
  // set up Quasar and Vue
  Quasar()
  const LocalVue = Vue.extend()

  let spyEventsHandling,
    wrapper

  const buildWrapper = (options = {}) => {
    const vm0 = new LocalVue({
      extends: DaykeepCalendar
    })
    spyEventsHandling = jest.spyOn(vm0, 'setupEventsHandling')
    vm0.$mount()
    wrapper = createWrapper(vm0, {
      options
    })
  }

  beforeEach(() => {
    buildWrapper()
  })

  afterEach(() => {
    // IMPORTANT: Clean up the component instance and axios mock adapter
    wrapper.destroy()
    spyEventsHandling.mockRestore()
  })

  it('should be a Vue instance', () => {
    const instance = wrapper.findComponent(DaykeepCalendar)
    expect(instance.exists()).toBe(true)
  })

  it('set up event handling', () => {
    const vm = wrapper.vm
    expect(typeof vm.setupEventsHandling).toBe('function')
    expect(spyEventsHandling).toBeCalledTimes(1)
  })

  it('set the correct working date', () => {
    const vm = wrapper.vm
    expect(typeof vm.$data.workingDate).toBe('Date')
  })
})
