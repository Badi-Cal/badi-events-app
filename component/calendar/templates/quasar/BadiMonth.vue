<template>
  <div class="calendar-month">
    <badi-month-inner
      :start-date="startDate"
      :parsed-events="parsedEvents"
      :event-ref="eventRef"
      :prevent-event-detail="preventEventDetail"
      :calendar-locale="calendarLocale"
      :calendar-timezone="calendarTimezone"
      :saturday-first-day-of-week='true'
      :allow-editing="allowEditing"
      :render-html="renderHtml"
      :day-display-start-hour="dayDisplayStartHour"
      :full-component-ref="fullComponentRef"
    >
      <template v-slot:eventdetail="eventVal">
        <calendar-event-detail
          :ref="eventVal.targetRef"
          v-if="!eventVal.preventEventDetail"
          :event-object="eventVal.eventObject"
          :calendar-locale="eventVal.calendarLocale"
          :calendar-timezone="eventVal.calendarTimezone"
          :event-ref="eventVal.eventRef"
          :allow-editing="eventVal.allowEditing"
          :render-html="eventVal.renderHtml"
        />
      </template>
    </badi-month-inner>
  </div>
</template>

<script>
  import {
    CalendarMixin,
    CalendarEventMixin,
    CalendarPropsMixin,
    CalendarMonthMixin,
    CalendarBadiMixin,
    BadiMonthTemplate
  } from 'mixins'

  import BadiMonthInner from './BadiMonthInner.vue'
  import CalendarEventDetail from './CalendarEventDetail'

  export default {
    name: 'BadiMonth',
    components: {
      CalendarEventDetail,
      BadiMonthInner
    },
    mixins: [
      CalendarMixin,
      CalendarEventMixin,
      CalendarPropsMixin,
      CalendarMonthMixin,
      CalendarBadiMixin,
      BadiMonthTemplate
    ]
  }
</script>

<style lang="stylus">
</style>
