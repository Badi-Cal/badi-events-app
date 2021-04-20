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
            calendar-locale="en"
            calendar-timezone="America/New_York"
            NOevent-ref="MYCALENDAR"
            :allow-editing="true"
            agenda-style="block"
            :render-html="true"
            :start-date="new Date()"
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
    api
  } from '../../boot/axios'
  export default {
    name: 'PageIndex',
    components: {
      QPage,
      QCard,
      QCardSection,
      DaykeepCalendar
    },
    data () {
      return {
        eventArray: [],
        showCards: ['fullCalendar']
      }
    },
    computed: {},
    methods: {
      loadData () {
        api.get('/eventitems.json')
          .then((response) => {
            this.eventArray = response.data
          })
          .catch(() => {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
          })
      }
    },
    created () {
      this.loadData()
    }
  }
</script>

<style lang="stylus">
</style>
