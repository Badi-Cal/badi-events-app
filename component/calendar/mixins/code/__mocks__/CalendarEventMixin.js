/* eslint-disable no-undef */
const mixin = jest.requireActual('../CalendarEventMixin')

const mockHasAnyEvents = jest.fn((thisDateObject) => false)

export default {
  __esModule: true,
  default: {
    computed: {
      ...mixin.default.computed
    },
    methods: {
      ...mixin.default.methods,
      hasAnyEvents: mockHasAnyEvents
    }
  }
}
