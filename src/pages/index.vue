<template>
  <q-page padding class="row NOflex NOflex-center">
    <div inline class="full-width q-ma-sm">
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
      <router-view
        :parsed-events="parsed"
        :view="view"
        :year="year"
        :month="month"
        :day="day"
      >
      </router-view>
     </transition>
     </div>
  </q-page>
</template>

<script>
  const debug = require('debug')('calendar:index')

  import {
    QPage
  } from 'quasar'
  import {
    api
  } from 'boot/axios'
  import { EventMixin } from '../mixins'
  import { CalendarMixin, CalendarEventMixin } from 'mixins'
  export default {
    name: 'PageIndex',
    components: {
      QPage
    },
    mixins: [ EventMixin, CalendarMixin, CalendarEventMixin ],
    data () {
      return {
        eventArray: [],
        parsed: {
          byAllDayStartDate: {},
          byStartDate: {},
          byId: {}
        }
      }
    },
    props: {
      view: {
        type: String
      },
      year: {
        type: Number
      },
      month: {
        type: Number
      },
      day: {
        type: Number
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
