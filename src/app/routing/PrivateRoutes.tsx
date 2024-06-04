import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {Offer, Banners, Services} from '../../NewPages/Pages'
import {UpdateServices} from '../../NewPages/Pages/Services/UpdateServices'
import {UpdateBanners} from '../../NewPages/Pages/Banners/UpdateBanners'
import {Updateoffers} from '../../NewPages/Pages/offer/Updateoffers'


import { UpdateBussinesPartner } from '../../NewPages/Pages/BussinesPartner/UpdateBussinesPartner'
import BussinesPartner from '../../NewPages/Pages/BussinesPartner/BussinesPartner'
import SocialMediaLinks from '../../NewPages/Pages/SocialMediaLinks/SocialMediaLinks'
import { UpdateSocialMediaLinks } from '../../NewPages/Pages/SocialMediaLinks/UpdateSocialMediaLinks'
import Contacts from '../../NewPages/Pages/Contacts/Contacts'
import Order from '../../NewPages/Pages/Order/Order'
import { UpdateContactDetails } from '../../NewPages/Pages/ContactDetails/UpdateContactDetails'
import ContactDetails from '../../NewPages/Pages/ContactDetails/ContactDetails'
import { UpdateProjects } from '../../NewPages/Pages/Projects/UpdateProjects'

const PrivateRoutes = () => {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='offer' element={<Offer />} />
        <Route path='banner' element={<Banners />} />
        <Route path='services' element={<Services />} />
        <Route path='updateServices/:id' element={<UpdateServices />} />
        <Route path='updateBanners/:id' element={<UpdateBanners />} />
        <Route path='updateoffers/:id' element={<Updateoffers />} />
        <Route path='updateSocialMedia/:id' element={<UpdateSocialMediaLinks />} />
        <Route path='UpdateBussinesPartner/:id' element={<UpdateBussinesPartner />} />
        <Route path='updateProject/:id' element={<UpdateProjects />} />
        <Route path='ContactDetails' element={<ContactDetails />} />
        <Route path='socialmedialinks' element={<SocialMediaLinks />} />
        <Route path='Bussinespartner' element={<BussinesPartner />} />
        <Route path='Contacts' element={<Contacts />} />
        <Route path='order' element={<Order />} />
        <Route path='updateContactDetails/:id' element={<UpdateContactDetails />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
