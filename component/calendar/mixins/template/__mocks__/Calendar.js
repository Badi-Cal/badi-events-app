/* eslint-disable no-undef */
const mixin = jest.requireActual('../Calendar')

// Create a spy for setupEventsHandling
export const spyEventsHandling = jest.fn()

export default {
  __esModule: true,
  default: {
    ...mixin.default,
    methods: {
      ...mixin.default.methods,
      setupEventsHandling: spyEventsHandling
    }
  }
}
