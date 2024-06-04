import ReactDOM from 'react-dom'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'

//
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import ar from './locales/ar/translation.json'
import en from './locales/en/translation.json'
import './style.css'

// Apps
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
/**
 * TIP: Replace this style import with dark styles to enable dark mode
 *
 * import './_metronic/assets/sass/style.dark.scss'
 *
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/style.react.scss'
import {AppRoutes} from './app/routing/AppRoutes'
import {AuthProvider, setupAxios} from './app/modules/auth'
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */

/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
import 'bootstrap/dist/css/bootstrap.min.css'

setupAxios(axios)

Chart.register(...registerables)

const queryClient = new QueryClient()

const lang = localStorage.getItem('language')
if (lang === 'en') {
  document.body.dir = 'ltr'
} else {
  document.body.dir = 'rtl'
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
  lng: lang || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  returnEmptyString: false,
})

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <MetronicI18nProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </MetronicI18nProvider>
  </QueryClientProvider>,
  document.getElementById('root')
)
