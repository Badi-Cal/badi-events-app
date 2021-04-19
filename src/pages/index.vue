<template>
  <q-page padding class="row NOflex NOflex-center">
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
      <q-card
        inline
        class="full-width q-ma-sm"
      >
        <q-card-section>
          <daykeep-calendar
            :event-array="eventArray"
            :sunday-first-day-of-week="false"
            NOcalendar-locale="fr"
            NOcalendar-timezone="America/Los_Angeles"
            NOevent-ref="MYCALENDAR"
            :allow-editing="true"
            agenda-style="block"
            :render-html="true"
            :NOstart-date="new Date(2019, 1, 4)"
          />
        </q-card-section>
      </q-card>
    </transition>
  </q-page>
</template>

<script>
  import {
    QPage,
    QCard,
    QCardSection
  } from 'quasar'
  import {
    DaykeepCalendar
  } from '../../component/quasar'
  import {
    MoveDates,
    sampleEventArray
  } from '@daykeep/calendar-core/demo'
  export default {
    name: 'PageIndex',
    components: {
      QPage,
      QCard,
      QCardSection,
      DaykeepCalendar
    },
    mixins: [ MoveDates ],
    data () {
      return {
        eventArray: sampleEventArray, // in page-code-mixins/sample-data.js
        showCards: ['fullCalendar']
      }
    },
    computed: {},
    methods: {},
    created () {
      this.moveSampleDatesAhead()
    }
  }
</script>

<style lang="stylus">
</style>
