<template>
  <div class="calendar-badi">
    <q-tabs
      class="text-primary calendar-tabs"
      ref="fullCalendarTabs"
      align="left"
    >
      <q-route-tab
        to="/calendar/badi/month/180/11/15"
        exact
        icon="view_module"
        :label="tabLabels.month"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="calendarTab"
      class="calendar-tab-panels"
      animated
    >
      <q-tab-panel name="tab-month" class="calendar-tab-panel-month">
        <badi-month
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
    </q-tab-panels>
  </div>
</template>

<script>
  import {
    CalendarMixin,
    CalendarEventMixin,
    CalendarPropsMixin,
    CalendarBadiMixin,
    BadiTemplateMixin,
    CalendarTemplateMixin
  } from 'mixins'
  import BadiMonth from './BadiMonth'
  import {
    QTabs,
    QRouteTab,
    QTabPanels,
    QTabPanel,
    QSeparator
  } from 'quasar'

  export default {
    name: 'BadiCalendar',
    mixins: [
      CalendarMixin,
      CalendarEventMixin,
      CalendarPropsMixin,
      CalendarBadiMixin,
      CalendarTemplateMixin,
      BadiTemplateMixin
    ],
    components: {
      BadiMonth,
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
