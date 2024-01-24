<template>
  <badi-calendar
    :parsed-events="parsedEvents"
    calendar-locale="en-US"
    calendar-timezone="America/New_York"
    NOevent-ref="MYCALENDAR"
    :allow-editing="true"
    agenda-style="block"
    :render-html="true"
    :start-date="startDateBadi"
    :calendar-tab="calendarTab"
  />
</template>

<script>
  import BadiDate from 'utils/badidate'
  import { DateMixin, CalendarMixin } from '../mixins'
  import {
    BadiCalendar
  } from '../../component/quasar'
  export default {
    name: 'PageBadi',
    components: { BadiCalendar },
    mixins: [ CalendarMixin, DateMixin ],
    props: {
      year: {
        type: Number,
        default: new BadiDate().year
      },
      month: {
        type: Number,
        default: new BadiDate().month
      },
      day: {
        type: Number,
        default: new BadiDate().day
      }
    }
  }
</script>

<style lang="stylus">
</style>
