<template>
  <div class="calendar-day-labels flex-row flex-no-wrap flex-justify-end">
    <div
      v-for="thisDay in weekDateArray"
      :key="toDateFormat(thisDay, 'WEEKDAY_SHORT')"
      :class="{
        'calendar-day-label': true,
        'calendar-cell': true,
        'calendar-day-label-current': isCurrentDayLabel(thisDay),
        'cursor-pointer': calendarDaysAreClickable
      }"
      :style="{
        'width': cellWidth,
        'max-width': cellWidth,
      }"
      @click="handleDayClick(thisDay)"
    >
      {{ toDateFormat(thisDay, 'WEEKDAY_SHORT') }}
      <div
        v-if="showDates"
        class="calendar-day-label-date"
      >
        {{ toDateFormat(thisDay, 'DAY_NUMBER') }}
      </div>
    </div>
  </div>
</template>

<script>
  import {
    CalendarMixin,
    CalendarBadiMixin,
    CalendarDayLabelsTemplateMixin
  } from '../../mixins'

  export default {
    name: 'CalendarDayLabels',
    mixins: [
      CalendarMixin,
      CalendarBadiMixin,
      CalendarDayLabelsTemplateMixin
    ]
  }
</script>

<style lang="stylus">
  .calendar-day-labels
    .calendar-day-label
      font-size 1.1em
      padding-left 4px
      .calendar-day-label-date
        font-size 1.75em
    .calendar-day-label-current
      font-weight bold

</style>
