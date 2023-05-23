<template>
  <div class="calendar-month">
    <calendar-month-inner
      :start-date="startDate"
      :parsed-events="parsedEvents"
      :event-ref="eventRef"
      :prevent-event-detail="preventEventDetail"
      :calendar-locale="calendarLocale"
      :calendar-timezone="calendarTimezone"
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
          {{ toDateFormat(navVal.workingDate, 'MONTH_YEAR') }}
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
    </calendar-month-inner>
  </div>
</template>

<script>
  import {
    CalendarMixin,
    CalendarEventMixin,
    CalendarPropsMixin,
    CalendarMonthMixin,
    CalendarMonthTemplateMixin
  } from 'mixins'

  import CalendarMonthInner from './CalendarMonthInner.vue'
  import CalendarHeaderNav from './CalendarHeaderNav.vue'
  import CalendarEventDetail from './CalendarEventDetail.vue'

  export default {
    name: 'CalendarMonth',
    components: {
      CalendarHeaderNav,
      CalendarEventDetail,
      CalendarMonthInner
    },
    mixins: [
      CalendarMixin,
      CalendarEventMixin,
      CalendarPropsMixin,
      CalendarMonthMixin,
      CalendarMonthTemplateMixin
    ]
  }
</script>

<style lang="stylus">
</style>
