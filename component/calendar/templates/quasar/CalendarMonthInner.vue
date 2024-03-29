<template>
  <div class="calendar-month">
    <slot name="headernav"></slot>
    <calendar-header-nav
      time-period-unit="month"
      :time-period-amount="1"
      :working-date="startDate"
    >
      {{ toDateFormat(startDate, 'MONTH_YEAR') }}
    </calendar-header-nav>
    <div class="calendar-content" data-cy="calendar-content">
      <calendar-day-labels
        :number-of-days="7"
        :start-date="startDate"
        :force-start-of-week="true"
        :calendar-locale="calendarLocale"
      />
      <div
        v-for="(thisWeek, index) in weekArray"
        :key="index"
        :class="{
          'calendar-multi-day': true,
          'flex-row': true,
          'flex-no-wrap': true,
          'flex-items-start': true,
          'flex-justify-end': index < (weekArray.length - 1),
          'flex-justify-start': index === (weekArray.length - 1)
        }"
      >
        <div
          :class="{
            'calendar-day': true,
            'calendar-cell': true,
            'calendar-day-weekend': isWeekendDay(thisDay.dateObject),
            'calendar-day-today': isCurrentDate(thisDay.dateObject)
          }"
          v-for="(thisDay, weekDayIndex) in thisWeek"
          :key="makeDT(thisDay.dateObject).toISODate()"
          @click="handleDayClick(thisDay.dateObject)"
        >
          <div
            v-if="isCurrentDate(thisDay.dateObject)"
            :class="{
              'calendar-day-number': true,
              'calendar-day-number-today': true,
              'is-clickable': calendarDaysAreClickable
            }"
          >
            <span class="inner-span">
              {{ thisDay.dateObject.day }}
            </span>
          </div>
          <div
            v-else
            :class="{
              'calendar-day-number': true,
              'calendar-day-number-current': isCurrentMonth(thisDay.dateObject),
              'cursor-pointer': calendarDaysAreClickable
            }"
          >
            <span class="inner-span">
              {{ thisDay.dateObject.day }}
            </span>
          </div>
          <div class="calendar-day-content" data-cy='calendar-day-content'>
            <template v-if="hasAnyEvents(thisDay.dateObject)">
              <div
                v-for="thisEvent in dateGetEvents(thisDay.dateObject)"
                :key="thisEvent.id"
              >
                <template v-if="!eventIsContinuedFromPreviousDay(thisEvent.id, thisDay.dateObject)">
                  <calendar-event
                    :event-object="thisEvent"
                    :month-style="true"
                    :event-ref="eventRef"
                    :prevent-event-detail="preventEventDetail"
                    :current-calendar-day="thisDay.dateObject"
                    :has-previous-day="thisEvent.hasPrev"
                    :has-next-day="thisEvent.hasNext"
                    :first-day-of-week="(weekDayIndex === 0)"
                    :last-day-of-week="(weekDayIndex === (thisWeek.length -1))"
                    :allow-editing="allowEditing"
                    @click="handleCalendarEventClick"
                    render-style="singleLine"
                  />
                </template>

              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <slot
      name="eventdetail"
      targetRef="defaultEventDetail"
      :prevent-event-detail="preventEventDetail"
      :event-object="eventDetailEventObject"
      :calendar-locale="calendarLocale"
      :calendar-timezone="calendarTimezone"
      :event-ref="eventRef"
      :allow-editing="allowEditing"
      :render-html="renderHtml"
    ></slot>
  </div>
</template>

<script>
  import {
    CalendarMixin,
    CalendarEventMixin,
    CalendarPropsMixin,
    MonthInnerMixin,
    CalendarMonthInnerTemplateMixin
  } from 'mixins'

  import {
    CalendarDayLabels,
    CalendarEvent,
    CalendarHeaderNav
  } from 'templates/common'

  export default {
    name: 'CalendarMonthInner',
    components: {
      CalendarEvent,
      CalendarDayLabels,
      CalendarHeaderNav
    },
    mixins: [
      CalendarPropsMixin,
      CalendarMixin,
      CalendarEventMixin,
      MonthInnerMixin,
      CalendarMonthInnerTemplateMixin
    ]
  }
</script>

<style lang="stylus">
  @import '../../styles-common/calendar.vars.styl'

  .calendar-month

    .calendar-time-width
      width $dayTimeLabelWidth
    .calendar-time-margin
      margin-left $dayTimeLabelWidth

    .calendar-header
      .calendar-header-label
        font-size 1.25em
        font-weight bold
    .calendar-content
      padding 4px 12px
      .calendar-cell
        width $cellWidth
        max-width $cellWidth
        padding 0
      .calendar-day-labels
        .calendar-day-label
          font-size 1.1em
        .calendar-day-label-current
          font-weight bold
      .calendar-multi-day
        border-bottom 1px solid $borderColor
        :last-child
          border-bottom none
      .calendar-day
        background-color none
        height $cellHeight
        max-height $cellHeight
        overflow hidden
        width $sevenCellWidth
        .calendar-day-number
          color $grey-7
          font-size 0.9em
          height 2em
          width 2em
          vertical-align middle
          padding-top .25em
          padding-left .25em
          .inner-span
            font-size 1.1em
        .calendar-day-number-today
          color $grey-1
          border-radius 50%
          background $primary
          text-align center
        .calendar-day-number-current
          color $dark
      .calendar-day-weekend
        background-color $weekendDayBackgroundColor

</style>
