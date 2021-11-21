/* eslint-disable-next-line */
import { BadiMonth } from 'templates/quasar'
import { sampleEventArray, MoveDates } from '@daykeep/calendar-core/demo/'

import { DateTime } from 'luxon'
import BadiDate from 'utils/badidate'

const datetime = DateTime.now()

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Calendar/Month/Badi',
  component: BadiMonth
}

// 👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BadiMonth },
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
    <badi-month
      :start-date="workingDateBadi"
      :event-array="eventArray"
      :sunday-first-day-of-week="false"
      :allow-editing="false"
      :render-html="true"
      :calendar-locale="calendarLocale"
      :calendar-timezone="calendarTimezone"
  />
  `
})

export const BuenosAires = Template.bind({})
BuenosAires.args = {
  calendarLocale: 'es-ar',
  calendarTimezone: 'America/Argentina/Buenos_Aires',
  workingDateBadi: new BadiDate(datetime)
}

export const NewYork = Template.bind({})
NewYork.args = {
  calendarLocale: 'en-us',
  calendarTimezone: 'America/New_York',
  workingDateBadi: new BadiDate(datetime)
}
