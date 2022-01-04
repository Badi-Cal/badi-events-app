<template>
  <div class="calendar-badi">
    <q-tabs
      v-model="currentTab"
      class="text-primary calendar-tabs"
      ref="fullCalendarTabs"
      align="left"
    >
      <q-tab
        name="tab-month"
        icon="view_module"
        :label="tabLabels.month"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="currentTab"
      class="calendar-tab-panels"
      animated
    >
      <q-tab-panel name="tab-month" class="calendar-tab-panel-month">
        <badi-month
          :ref="'month-' + thisRefName"
          :start-date="workingDate"
          :parsed-events="parsed"
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
    CalendarTemplateMixin,
    CalendarBadiMixin,
    BadiTemplateMixin
  } from 'mixins'
  import BadiMonth from './BadiMonth'
  import {
    QTabs,
    QTab,
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
      CalendarTemplateMixin,
      CalendarBadiMixin,
      BadiTemplateMixin
    ],
    components: {
      BadiMonth,
      QTabs,
      QTab,
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
