
export default {
  methods: {},
  watch: {
    eventArray: function () {
      this.getPassedInEventArray()
    },
    parsedEvents: function () {
      this.getPassedInParsedEvents()
    }
  }
}
