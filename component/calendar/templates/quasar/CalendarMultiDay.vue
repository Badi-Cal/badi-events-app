<template>
  <div class="calendar-multi-day-component flex-column fit flex-no-wrap">
    <!-- week nav -->
    <template v-if="numDays === 1">
      <calendar-header-nav
        time-period-unit="days"
        :time-period-amount="navDays"
        :working-date="startDate"
      >
        {{ toDateFormat(startDate, 'DATE_FULL') }}
      </calendar-header-nav>
    </template>
    <template v-else>
      <calendar-header-nav
        time-period-unit="days"
        :time-period-amount="navDays"
        :working-date="startDate"
      >
        {{ getHeaderLabel() }}
      </calendar-header-nav>
    </template>

    <div v-if="numDays > 1" class="calendar-time-margin">
      <calendar-day-labels
        :number-of-days="numDays"
        :show-dates="true"
        :start-date="startDate"
        :force-start-of-week="forceStartOfWeek"
        :full-component-ref="fullComponentRef"
        :calendar-locale="calendarLocale"
      />
    </div>

    <!-- all day events -->
    <div class="calendar-time-margin">
      <calendar-all-day-events
        :number-of-days="numDays"
        :start-date="weekDateArray[0]"
        :parsed="parsed"
        :event-ref="eventRef"
        :prevent-event-detail="preventEventDetail"
        :calendar-locale="calendarLocale"
        :calendar-timezone="calendarTimezone"
        :allow-editing="allowEditing"
      />
    </div>

    <!-- content -->
    <q-scroll-area
      :style="getScrollStyle"
      :class="getScrollClass"
    >

      <calendar-multi-day-content
        :week-date-array="weekDateArray"
        :working-date="startDate"
        :num-days="numDays"
        :nav-days="navDays"
        :parsed="parsed"
        :event-ref="eventRef"
        :prevent-event-detail="preventEventDetail"
        :calendar-locale="calendarLocale"
        :calendar-timezone="calendarTimezone"
        :allow-editing="allowEditing"
        :day-cell-height="dayCellHeight"
        :day-cell-height-unit="dayCellHeightUnit"
        :show-half-hours="showHalfHours"
      ></calendar-multi-day-content>

    </q-scroll-area>

    <calendar-event-detail
      ref="defaultEventDetail"
      v-if="!preventEventDetail"
      :event-object="eventDetailEventObject"
      :event-ref="eventRef"
      :calendar-locale="calendarLocale"
      :calendar-timezone="calendarTimezone"
      :allow-editing="allowEditing"
      :render-html="renderHtml"
    />

  </div>
</template>

<script>
  import {
    // components
    CalendarAllDayEvents,
    CalendarMultiDayContent
  } from '@daykeep/calendar-core'
  import { CalendarDayLabels, CalendarHeaderNav } from 'templates/common'
  import CalendarEventDetail from './CalendarEventDetail'
  import {
    // mixins
    CalendarMixin,
    CalendarEventMixin,
    CalendarPropsMixin,
    CalendarMultiDayTemplateMixin
  } from 'mixins'
  import { QScrollArea } from 'quasar'

  export default {
    name: 'CalendarMultiDay',
    mixins: [
      CalendarMixin,
      CalendarEventMixin,
      CalendarPropsMixin,
      CalendarMultiDayTemplateMixin
    ],
    components: {
      CalendarMultiDayContent,
      CalendarDayLabels,
      CalendarHeaderNav,
      CalendarAllDayEvents,
      CalendarEventDetail,
      QScrollArea
    }
  }
</script>

<style lang="stylus">
  @import '~@daykeep/calendar-core/component/calendar/styles-common/calendar.vars.styl'

  .calendar-multi-day-component
    .calendar-time-margin
      margin-left $dayTimeLabelWidth
    .calendar-header
      .calendar-header-label
        font-size 1.25em
        font-weight bold
    .calendar-day
      margin-top 10px
      .calendar-day-column-label
        width $dayTimeLabelWidth
      .calendar-day-column-content
        border-right $borderThin
        position relative
      .calendar-day-time
        padding-right .5em
        border-right $borderOuter
      .calendar-day-time-content
        border-top $borderThin

</style>
