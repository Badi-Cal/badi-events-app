<template>
  <calendar
    :parsed-events="parsedEvents"
    calendar-locale="en-US"
    calendar-timezone="America/New_York"
    NOevent-ref="MYCALENDAR"
    :allow-editing="true"
    agenda-style="block"
    :render-html="true"
    :start-date="startDateGregorian"
    :calendar-tab="calendarTab"
  />
</template>

<script>
  import { DateMixin, CalendarMixin } from '../mixins'
  import {
    Calendar
  } from '../../component/quasar'
  export default {
    name: 'PageGregrorian',
    components: { Calendar },
    mixins: [ CalendarMixin, DateMixin ],
    props: {
      year: {
        type: Number,
        default: new Date().getFullYear()
      },
      month: {
        type: Number,
        default: new Date().getMonth() + 1
      },
      day: {
        type: Number,
        default: new Date().getDate()
      }
    }
  }
</script>

<style lang="stylus">
</style>
