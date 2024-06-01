import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {initialQueryState, KTSVG} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import { t } from 'i18next'

const UsersListFilter = () => {
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [role, setRole] = useState<string | undefined>()
  const [lastLogin, setLastLogin] = useState<string | undefined>()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    updateState({
      filter: {role, last_login: lastLogin},
      ...initialQueryState,
    })
  }

  return (
    <>
    {/* begin::Filter Button */}
    <button
      disabled={isLoading}
      type='button'
      className='btn btn-light-primary me-3'
      data-kt-menu-trigger='click'
      data-kt-menu-placement='bottom-end'
    >
      <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
      {t('Filter')}
    </button>
    {/* end::Filter Button */}
    {/* begin::SubMenu */}
    <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
      {/* begin::Header */}
      <div className='px-7 py-5'>
        <div className='fs-5 text-dark fw-bolder'>{t('Filter Options')}</div>
      </div>
      {/* end::Header */}
  
      {/* begin::Separator */}
      <div className='separator border-gray-200'></div>
      {/* end::Separator */}
  
      {/* begin::Content */}
      <div className='px-7 py-5' data-kt-user-table-filter='form'>
        {/* begin::Input group */}
        <div className='mb-10'>
          <label className='form-label fs-6 fw-bold'>{t('Role')}:</label>
          <select
            className='form-select form-select-solid fw-bolder'
            data-kt-select2='true'
            data-placeholder={t('Select option')}
            data-allow-clear='true'
            data-kt-user-table-filter='role'
            data-hide-search='true'
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value=''></option>
            <option value='Administrator'>{t('Administrator')}</option>
            <option value='Analyst'>{t('Analyst')}</option>
            <option value='Developer'>{t('Developer')}</option>
            <option value='Support'>{t('Support')}</option>
            <option value='Trial'>{t('Trial')}</option>
          </select>
        </div>
        {/* end::Input group */}
  
        {/* begin::Input group */}
        <div className='mb-10'>
          <label className='form-label fs-6 fw-bold'>{t('Last login')}:</label>
          <select
            className='form-select form-select-solid fw-bolder'
            data-kt-select2='true'
            data-placeholder={t('Select option')}
            data-allow-clear='true'
            data-kt-user-table-filter='two-step'
            data-hide-search='true'
            onChange={(e) => setLastLogin(e.target.value)}
            value={lastLogin}
          >
            <option value=''></option>
            <option value='Yesterday'>{t('Yesterday')}</option>
            <option value='20 mins ago'>{t('20 mins ago')}</option>
            <option value='5 hours ago'>{t('5 hours ago')}</option>
            <option value='2 days ago'>{t('2 days ago')}</option>
          </select>
        </div>
        {/* end::Input group */}
  
        {/* begin::Actions */}
        <div className='d-flex justify-content-end'>
          <button
            type='button'
            disabled={isLoading}
            onClick={filterData}
            className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
            data-kt-menu-dismiss='true'
            data-kt-user-table-filter='reset'
          >
            {t('Reset')}
          </button>
          <button
            disabled={isLoading}
            type='button'
            onClick={resetData}
            className='btn btn-primary fw-bold px-6'
            data-kt-menu-dismiss='true'
            data-kt-user-table-filter='filter'
          >
            {t('Apply')}
          </button>
        </div>
        {/* end::Actions */}
      </div>
      {/* end::Content */}
    </div>
    {/* end::SubMenu */}
  </>
  
  )
}

export {UsersListFilter}
