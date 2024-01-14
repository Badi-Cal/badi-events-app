/* eslint-disable no-undef */
const mixin = jest.requireActual('../Calendar')

// Create a spy for setupEventsHandling
export const spyEventsHandling = jest.fn()

export default {
  __esModule: true,
  default: {
    computed: {
      ...mixin.default.computed
    },
    methods: {
      ...mixin.default.methods,
      setupEventsHandling: spyEventsHandling
    },
    props: {
      ...mixin.default.props
    },
    mounted () {
      mixin.default.mounted.call(this)
    }
  }
}
