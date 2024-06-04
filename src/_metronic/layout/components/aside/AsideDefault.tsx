/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {useLayout} from '../../core'
import {KTSVG} from '../../../helpers'
import {AsideMenu} from './AsideMenu'
import {t} from 'i18next'
import "./Aside.scss"
import logo from  "../../../assets/image/logo.svg"
const AsideDefault: FC = () => {
  const {config, classes} = useLayout()
  const {aside} = config

  return (
    <div
      className={clsx('aside')}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
    >
      {/* begin::Brand */}
      <div className='aside-logo flex-column-auto ' id='kt_aside_logo'>
        {/* begin::Logo */}
        {aside.theme === 'dark' && (
          <Link to='/dashboard'>
            <img
              alt='Logo'
              className='w-50 pt-3 logo'
              src={logo}
            />
          </Link>
        )}
        {aside.theme === 'light' && (
          <Link to='/dashboard'>
            <img
              alt='Logo'
              className='h-25px logo'
              src={logo}
            />
          </Link>
        )}
        {/* end::Logo */}

        {/* begin::Aside toggler */}
        {aside.minimize && (
          <div
            id='kt_aside_toggle'
            className='btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle'
            data-kt-toggle='true'
            data-kt-toggle-state='active'
            data-kt-toggle-target='body'
            data-kt-toggle-name='aside-minimize'
          >
            <KTSVG
              path={'/media/icons/duotune/arrows/arr080.svg'}
              className={'svg-icon-1 rotate-180'}
            />
          </div>
        )}
        {/* end::Aside toggler */}
      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}
    </div>
  )
}

export {AsideDefault}
