<template>
  <div class="calendar-test">
    <calendar-agenda-inner
      :agenda-style="agendaStyle"
      :num-days="numDays"
      :left-margin="leftMargin"
      :scroll-height="scrollHeight"
      :start-date="startDate"
      :event-array="eventArray"
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
        <!-- calendar header -->
        <calendar-header-nav
          time-period-unit="days"
          :time-period-amount="1"
          :move-time-period-emit="eventRef + ':navMovePeriod'"
          :calendar-locale="calendarLocale"
        >
          {{ toDateFormat(workingDate, 'MONTH_SHORT_DAY')}}
          -
          {{ toDateFormat(workingDate.plus({ days: numJumpDays }), 'MONTH_SHORT_DAY_YEAR')}}
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
    </calendar-agenda-inner>

  </div>
</template>

<script>
  import {
    CalendarMixin,
    CalendarEventMixin,
    CalendarPropsMixin,
    CalendarAgendaTemplateMixin
  } from 'mixins'
  import {
    CalendarAgendaInner
  } from '@daykeep/calendar-core'
  import CalendarEventDetail from './CalendarEventDetail'
  import {
    CalendarHeaderNav
  } from 'templates/common'

  export default {
    name: 'CalendarAgenda',
    mixins: [
      CalendarMixin,
      CalendarEventMixin,
      CalendarPropsMixin,
      CalendarAgendaTemplateMixin
    ],
    components: {
      CalendarHeaderNav,
      CalendarEventDetail,
      CalendarAgendaInner
    }
  }
</script>

<style lang="stylus">
  @import '~@daykeep/calendar-core/component/calendar/styles-common/calendar.vars.styl'

  .calendar-tab-panels
    .calendar-tab-panel-day,
    .calendar-tab-panel-week
      height 60vh
      max-height 60vh
      overflow hidden
    .q-tab-panel
      border none

</style>
