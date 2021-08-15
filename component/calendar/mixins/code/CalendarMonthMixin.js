const debug = require('debug')('calendar:CalendarMonth')

export default {
  computed: {

  },
  methods: {

  },
  mounted () {
    debug('Component mounted')
  },
  watch: {
    eventArray: function () {
      this.getPassedInEventArray()
    },
    parsedEvents: function () {
      this.getPassedInParsedEvents()
    }
  }
}
