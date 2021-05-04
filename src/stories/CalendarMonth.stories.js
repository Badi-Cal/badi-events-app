import { CalendarMonth } from 'templates/quasar'
import { sampleEventArray, MoveDates } from '@daykeep/calendar-core/demo/'

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Calendar/Month',
  component: CalendarMonth
}

// 👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CalendarMonth },
  data () {
    return {
      eventArray: sampleEventArray
    }
  },
  created () {
    this.moveSampleDatesAhead()
  },
  mixins: [ MoveDates ],
  template: `
    <calendar-month
      :start-date="new Date()"
      :event-array="eventArray"
      :sunday-first-day-of-week="true"
      :allow-editing="false"
      :render-html="true"
      :calendar-locale="calendarLocale"
      :calendar-timezone="calendarTimezone"
  />
  `
})

export const BuenosAires = Template.bind({})
BuenosAires.args = {
  calendarLocale: 'es',
  calendarTimezone: 'America/Argentina/Buenos_Aires'
}

export const NewYork = Template.bind({})
NewYork.args = {
  calendarLocale: 'en',
  calendarTimezone: 'America/New_York'
}
