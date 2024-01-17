<template>
  <div class="calendar-month">
    <calendar-header-nav
      data-cy="calendar-header"
      time-period-unit="month"
      :time-period-amount="1"
      :working-date="startDate"
    >
      <span v-html="formatDateBadi(startDate, 'MM+ yy')"></span>
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
          :key="thisDay.dateObject.format('yy-mm-dd')"
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
    CalendarBadiMixin,
    BadiMonthInnerTemplateMixin
  } from 'mixins'
  import {
    CalendarDayLabels,
    CalendarEvent,
    CalendarHeaderNav
  } from 'templates/common'

  export default {
    name: 'BadiMonthInner',
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
      CalendarBadiMixin,
      BadiMonthInnerTemplateMixin
    ]
  }
</script>

<style lang="stylus">

</style>
