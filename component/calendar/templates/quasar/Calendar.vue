<template>
  <div class="calendar">
    <q-tabs
      class="text-primary calendar-tabs"
      ref="fullCalendarTabs"
      align="left"
    >
      <q-route-tab
        to="/calendar/gregorian/month/2023/10/1"
        exact
        icon="view_module"
        :label="tabLabels.month"
      />
      <q-route-tab
        to="/calendar/gregorian/week/2023/10/1"
        exact
        icon="view_week"
        :label="tabLabels.week"
      />
      <q-route-tab
        to="/calendar/gregorian/multiday/2023/10/1"
        exact
        icon="view_column"
        :label="tabLabels.threeDay"
      />
      <q-route-tab
        to="/calendar/gregorian/day/2023/10/1"
        exact
        icon="view_day"
        :label="tabLabels.day"
      />
      <q-route-tab
        to="/calendar/gregorian/agenda/2023/10/1"
        exact
        icon="view_agenda"
        :label="tabLabels.agenda"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="calendarTab"
      class="calendar-tab-panels"
      animated
    >
      <q-tab-panel name="tab-month" class="calendar-tab-panel-month">
        <calendar-month
          :ref="'month-' + thisRefName"
          :start-date="startDate"
          :parsed-events="parsedEvents"
          :event-ref="eventRef"
          :full-component-ref="eventRef"
          :calendar-locale="calendarLocale"
          :calendar-timezone="calendarTimezone"
          :prevent-event-detail="preventEventDetail"
          :allow-editing="allowEditing"
        />
      </q-tab-panel>
      <q-tab-panel name="tab-week" class="calendar-tab-panel-week">
        <calendar-multi-day
          :ref="'week-' + thisRefName"
          :start-date="startDate"
          :parsed-events="parsedEvents"
          :num-days="7"
          :nav-days="7"
          :force-start-of-week="true"
          :event-ref="eventRef"
          :full-component-ref="eventRef"
          :calendar-locale="calendarLocale"
          :calendar-timezone="calendarTimezone"
          :prevent-event-detail="preventEventDetail"
          :allow-editing="allowEditing"
          :day-display-start-hour="dayDisplayStartHour"

        />
      </q-tab-panel>
      <q-tab-panel name="tab-multiday" class="calendar-tab-panel-week">
        <calendar-multi-day
          :ref="'multiday-' + thisRefName"
          :start-date="startDate"
          :parsed-events="parsedEvents"
          :num-days="3"
          :nav-days="1"
          :force-start-of-week="false"
          :event-ref="eventRef"
          :full-component-ref="eventRef"
          :calendar-locale="calendarLocale"
          :calendar-timezone="calendarTimezone"
          :prevent-event-detail="preventEventDetail"
          :allow-editing="allowEditing"
          :day-display-start-hour="dayDisplayStartHour"

        />
      </q-tab-panel>
      <q-tab-panel name="tab-day" class="calendar-tab-panel-week">
        <calendar-multi-day
          :ref="'day-' + thisRefName"
          :start-date="startDate"
          :parsed-events="parsedEvents"
          :num-days="1"
          :nav-days="1"
          :force-start-of-week="false"
          :event-ref="eventRef"
          :full-component-ref="eventRef"
          :calendar-locale="calendarLocale"
          :calendar-timezone="calendarTimezone"
          :prevent-event-detail="preventEventDetail"
          :allow-editing="allowEditing"
          :day-display-start-hour="dayDisplayStartHour"

        />
      </q-tab-panel>
      <q-tab-panel name="tab-agenda" class="calendar-tab-panel-agenda">
        <calendar-agenda
          :ref="'agenda-' + thisRefName"
          :start-date="startDate"
          :parsed-events="parsedEvents"
          :num-days="28"
          :event-ref="eventRef"
          scroll-height="300px"
          :full-component-ref="eventRef"
          :calendar-locale="calendarLocale"
          :calendar-timezone="calendarTimezone"
          :prevent-event-detail="preventEventDetail"
          :allow-editing="allowEditing"
        />
      </q-tab-panel>
    </q-tab-panels>

  </div>
</template>

<script>

  import {
    CalendarMixin,
    CalendarEventMixin,
    CalendarPropsMixin,
    CalendarTemplateMixin,
    GregorianTemplateMixin
  } from 'mixins'
  import CalendarMonth from './CalendarMonth'
  import CalendarMultiDay from './CalendarMultiDay'
  import CalendarAgenda from './CalendarAgenda'
  import {
    QTabs,
    QRouteTab,
    QTabPanels,
    QTabPanel,
    QSeparator
  } from 'quasar'

  export default {
    name: 'Calendar',
    mixins: [
      CalendarMixin,
      CalendarEventMixin,
      CalendarPropsMixin,
      CalendarTemplateMixin,
      GregorianTemplateMixin
    ],
    components: {
      CalendarMonth,
      CalendarMultiDay,
      CalendarAgenda,
      QTabs,
      QRouteTab,
      QTabPanels,
      QTabPanel,
      QSeparator
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
