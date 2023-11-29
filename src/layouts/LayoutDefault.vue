<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>

        <q-toolbar-title>
          {{ calendarAppName }} {{ calendarVersion }}
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="drawerLeft" side="left" elevated>
      <!-- drawer content -->
    </q-drawer>
    <q-drawer show-if-above v-model="drawerRight" :width="100" side="right" elevated>
      <!-- drawer content -->
        <q-list padding>
          <q-item clickable v-ripple v-on:click="tabName = 'badi'">
            <q-item-label overline>Badíʻ</q-item-label>
            <q-item-section>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple v-on:click="tabName = 'gregorian'">
            <q-item-label overline>Gregorian</q-item-label>
            <q-item-section>
            </q-item-section>
          </q-item>
        </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  const debug = require('debug')('calendar:LayoutDefault')

  import {
    openURL,
    QLayout,
    QHeader,
    QPageContainer,
    QToolbar,
    QToolbarTitle,
    QDrawer,
    QList,
    QItem,
    QItemSection,
    QItemLabel
  } from 'quasar'
  const pckg = require('../../package.json')
  export default {
    name: 'LayoutDefault',
    components: {
      QLayout,
      QHeader,
      QPageContainer,
      QToolbar,
      QToolbarTitle,
      QDrawer,
      QList,
      QItem,
      QItemSection,
      QItemLabel
    },
    data () {
      return {
        drawerRight: false,
        drawerLeft: false,
        tabName: ''
      }
    },
    computed: {
      calendarVersion: () => {
        return 'v' + pckg.version
      },
      calendarAppName: () => {
        return pckg.productName
      }
    },
    watch: {
      tabName: function () {
        this.$router.push({ path: `/calendar/${this.tabName}` })
          .catch((err) => {
            /*
            trying to navigate to same location as the current one throws error
            @see https://github.com/vuejs/vue-router/issues/2872
            */
            if (err.name !== 'NavigationDuplicated') {
              debug(err)
            }
          })
      }
    },
    methods: {
      openURL
    }
  }
</script>

<style>
</style>
