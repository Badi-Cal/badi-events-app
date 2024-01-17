<template>
  <q-page padding class="row NOflex NOflex-center">
    <div inline class="full-width q-ma-sm">
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >

      <q-tab-panels v-model="tab" animated>

        <q-tab-panel name="gregorian">
          <q-card>
            <q-card-section>
              <gregorian-calendar
                :parsed-events="parsed"
                calendar-locale="en-US"
                calendar-timezone="America/New_York"
                NOevent-ref="MYCALENDAR"
                :allow-editing="true"
                agenda-style="block"
                :render-html="true"
                :start-date="startDate"
                :calendar-tab="calendarTab"
              />
            </q-card-section>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="badi">
          <q-card>
            <q-card-section>
              <badi-calendar
                :parsed-events="parsed"
                calendar-locale="en-US"
                calendar-timezone="America/New_York"
                NOevent-ref="MYCALENDAR"
                :allow-editing="true"
                agenda-style="block"
                :render-html="true"
                :start-date="startDate"
                :calendar-tab="calendarTab"
              />
            </q-card-section>
          </q-card>
        </q-tab-panel>

        </q-tab-panels>
      </transition>
      </div>
  </q-page>
</template>

<script>
  const debug = require('debug')('calendar:index')

  import {
    QPage,
    QCard,
    QCardSection,
    QTabPanel,
    QTabPanels
  } from 'quasar'
  import {
    GregorianCalendar,
    BadiCalendar
  } from '../../component/quasar'
  import {
    api
  } from 'boot/axios'
  import { EventMixin } from '../mixins'
  import { CalendarMixin, CalendarEventMixin } from 'mixins'
  export default {
    name: 'PageIndex',
    components: {
      QPage,
      QCard,
      QCardSection,
      QTabPanel,
      QTabPanels,
      GregorianCalendar,
      BadiCalendar
    },
    mixins: [ EventMixin, CalendarMixin, CalendarEventMixin ],
    data () {
      return {
        eventArray: [],
        parsed: {
          byAllDayStartDate: {},
          byStartDate: {},
          byId: {}
        },
        showCards: ['fullCalendar']
      }
    },
    props: {
      tab: {
        type: String,
        default: 'gregorian'
      },
      view: {
        type: String,
        default: 'month'
      },
      year: {
        type: Number,
        default: new Date().getFullYear()
      },
      month: {
        type: Number,
        default: new Date().getMonth()
      },
      day: {
        type: Number,
        default: new Date().getDate()
      }
    },
    computed: {
      calendarTab: function () {
        return `tab-${this.view}`
      },
      startDate: function () {
        return new Date(this.year, this.month, this.day)
      }
    },
    methods: {
      loadData () {
        api.get('/eventitems.json')
          .then((response) => {
            this.eventArray = response.data
            return this.eventArray
          })
          .then((events) => {
            this.parseEventList()
          })
          .catch((error) => {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem',
              timeout: 10000
            })
            debug(error)
          })
      }
    },
    created () {
      this.loadData()
    },
    mounted () {}
  }
</script>

<style lang="stylus">
</style>
