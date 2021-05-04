// Setup context for Storybook here
import Vue from 'vue'
import Quasar, {
  QLayout,
  QHeader,
  QPageContainer,
  QPage,
  QCard,
  QCardSection
} from 'quasar'

// extras
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/animate/fadeInLeft.css'
import '@quasar/extras/animate/fadeOutLeft.css'

// App styles
import 'quasar/src/css/index.styl'
import 'src/css/app.styl'

// run needed boot plugins
Vue.use(Quasar, {
  components: {
    QLayout,
    QPageContainer,
    QPage,
    QHeader,
    QCard,
    QCardSection
  }
})

export const decorators = [
  (Story) => ({
    name: 'PageIndex',
    components: {
      Story
    },
    template: `
    <q-layout view="lHh Lpr lFf">
      <q-header>

      </q-header>
      <q-page-container>
        <q-page padding class="row NOflex NOflex-center">
          <q-card inline class='full-width q-ma-sm'>
          <q-card-section>
            <story />
          </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
   `
  })
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
