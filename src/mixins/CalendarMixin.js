/**
 * @fileoverview Shared properties and props for badi.vue and gregorian.vue
 */

export default {
  computed: {
    calendarTab: function () {
      return `tab-${this.view}`
    }
  },
  props: {
    parsedEvents: {
      type: Object
    },
    view: {
      type: String,
      default: 'month'
    }
  }
}
