<template>
  <div class="calendar-month">
    <badi-month-inner
      :start-date="startDate"
      :event-array="eventArray"
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
      <template v-slot:headernav="navVal">
        <calendar-header-nav
          data-cy="calendar-header"
          :time-period-unit="navVal.timePeriodUnit"
          :time-period-amount="1"
          :move-time-period-emit="navVal.eventRef + ':navMovePeriod'"
        >
          {{ formatDateBadi(navVal.workingDate, 'MM+ yy') }}
        </calendar-header-nav>
      </template>
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
  import CalendarHeaderNav from './CalendarHeaderNav'
  import CalendarEventDetail from './CalendarEventDetail'

  export default {
    name: 'BadiMonth',
    components: {
      CalendarHeaderNav,
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
