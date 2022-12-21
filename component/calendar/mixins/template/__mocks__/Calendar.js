/* eslint-disable no-undef */
const mixin = jest.requireActual('../Calendar.js')

export const spyEventsHandling = jest.fn()

export default {
  __esModule: true,
  default: {
    props: {
      ...mixin.default.props
    },
    data: mixin.default.data,
    computed: {
      ...mixin.default.computed
    },
    methods: {
      ...mixin.default.methods,
      setupEventsHandling: spyEventsHandling,
      createRandomString: function () {
        return Math.random().toString(36).substring(2, 15)
      }
    },
    mounted: mixin.default.mounted,
    watch: {
      ...mixin.default.watch
    }
  }
}
