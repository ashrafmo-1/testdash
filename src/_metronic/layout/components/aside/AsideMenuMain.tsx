/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {AsideMenuItem} from './AsideMenuItem'
import {t} from 'i18next'
import icon from '../../../assets/image/serviceIcon.svg'
export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      {/* <AsideMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      /> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>{t('Crafted')}</span>
        </div>
      </div>

      <div className='d-flex flex-column gap-3 mt-3 fs-'>
        <AsideMenuItem
          to='/Services'
          title='الخدمات'
          fontIcon={icon}
          icon='/media/icons/duotune/general/services.svg'
        ></AsideMenuItem>
        <AsideMenuItem
          to='/crafted/pages/profile/projects'
          title='المشاريع'
          icon='/media/icons/duotune/general/projectIcon.svg'
        />
        <AsideMenuItem
          to='/banner'
          title='لافتات'
          icon='/media/icons/duotune/general/banner.svg'
        ></AsideMenuItem>
        <AsideMenuItem
          to='/offer'
          title='العروض'
          icon='/media/icons/duotune/general/offer.svg'
        ></AsideMenuItem>
        <AsideMenuItem
          to='/contacts'
          title='الاتصالات'
          icon='/media/icons/duotune/general/contact.svg'
        ></AsideMenuItem>
        <AsideMenuItem
          to='/bussinespartner'
          title='شركاء العمل'
          icon='/media/icons/duotune/general/partner.svg'
        ></AsideMenuItem>
        <AsideMenuItem
          to='/contactdetails'
          title='تفاصيل الاتصال'
          icon='/media/icons/duotune/general/contactdetails.svg'
        ></AsideMenuItem>
        <AsideMenuItem
          to='/socialmedialinks'
          title='لينكات السوشيال ميديا'
          icon='/media/icons/duotune/general/socialmedia.svg'
        ></AsideMenuItem>
        <AsideMenuItem
          to='/order'
          title='الاوردرات'
          icon='/media/icons/duotune/general/order.svg'
        ></AsideMenuItem>
      </div>
    </>
  )
}
