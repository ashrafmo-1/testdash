import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Charts} from './components/Charts'
import {Feeds} from './components/Feeds'
import {Lists} from './components/Lists'
import {Tables} from './components/Tables'
import {Mixed} from './components/Mixed'
import {Statistics} from './components/Statistics'
import { t } from 'i18next'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Widgets',
    path: '/crafted/widgets/charts',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const WidgetsPage = () => {
  return (
    <Routes>
    <Route element={<Outlet />}>
      <Route
        path='charts'
        element={
          <>
            <PageTitle breadcrumbs={widgetsBreadCrumbs}>{t('Charts')}</PageTitle>
            <Charts />
          </>
        }
      />
      <Route
        path='feeds'
        element={
          <>
            <PageTitle breadcrumbs={widgetsBreadCrumbs}>{t('Feeds')}</PageTitle>
            <Feeds />
          </>
        }
      />
      <Route
        path='lists'
        element={
          <>
            <PageTitle breadcrumbs={widgetsBreadCrumbs}>{t('Lists')}</PageTitle>
            <Lists />
          </>
        }
      />
      <Route
        path='mixed'
        element={
          <>
            <PageTitle breadcrumbs={widgetsBreadCrumbs}>{t('Mixed')}</PageTitle>
            <Mixed />
          </>
        }
      />
      <Route
        path='tables'
        element={
          <>
            <PageTitle breadcrumbs={widgetsBreadCrumbs}>{t('Tables')}</PageTitle>
            <Tables />
          </>
        }
      />
      <Route
        path='statistics'
        element={
          <>
            <PageTitle breadcrumbs={widgetsBreadCrumbs}>{t('Statistics')}</PageTitle>
            <Statistics />
          </>
        }
      />
      <Route index element={<Navigate to='/crafted/widgets/lists' />} />
    </Route>
  </Routes>  
  )
}

export default WidgetsPage
