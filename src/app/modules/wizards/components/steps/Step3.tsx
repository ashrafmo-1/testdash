import React, {FC} from 'react'
import {Field, ErrorMessage} from 'formik'
import { t } from 'i18next'

const Step3: FC = () => {
  return (
    <div className='w-100'>
    <div className='pb-10 pb-lg-12'>
      <h2 className='fw-bolder text-dark'>{t('Business Details')}</h2>
  
      <div className='text-gray-400 fw-bold fs-6'>
        {t('If you need more info, please check out')}
        <a href='/dashboard' className='link-primary fw-bolder'>
          {' '}
          {t('Help Page')}
        </a>
        .
      </div>
    </div>
  
    <div className='fv-row mb-10'>
      <label className='form-label required'>{t('Business Name')}</label>
  
      <Field name='businessName' className='form-control form-control-lg form-control-solid' />
      <div className='text-danger mt-2'>
        <ErrorMessage name='businessName' />
      </div>
    </div>
  
    <div className='fv-row mb-10'>
      <label className='d-flex align-items-center form-label'>
        <span className='required'>{t('Shortened Descriptor')}</span>
      </label>
  
      <Field
        name='businessDescriptor'
        className='form-control form-control-lg form-control-solid'
      />
      <div className='text-danger mt-2'>
        <ErrorMessage name='businessDescriptor' />
      </div>
  
      <div className='form-text'>
        {t('Customers will see this shortened version of your statement descriptor')}
      </div>
    </div>
  
    <div className='fv-row mb-10'>
      <label className='form-label required'>{t('Corporation Type')}</label>
  
      <Field
        as='select'
        name='businessType'
        className='form-select form-select-lg form-select-solid'
      >
        <option></option>
        <option value='1'>{t('S Corporation')}</option>
        <option value='1'>{t('C Corporation')}</option>
        <option value='2'>{t('Sole Proprietorship')}</option>
        <option value='3'>{t('Non-profit')}</option>
        <option value='4'>{t('Limited Liability')}</option>
        <option value='5'>{t('General Partnership')}</option>
      </Field>
      <div className='text-danger mt-2'>
        <ErrorMessage name='businessType' />
      </div>
    </div>
  
    <div className='fv-row mb-10'>
      <label className='form-label'>{t('Business Description')}</label>
  
      <Field
        as='textarea'
        name='businessDescription'
        className='form-control form-control-lg form-control-solid'
        rows={3}
      ></Field>
    </div>
  
    <div className='fv-row mb-0'>
      <label className='fs-6 fw-bold form-label required'>{t('Contact Email')}</label>
  
      <Field name='businessEmail' className='form-control form-control-lg form-control-solid' />
      <div className='text-danger mt-2'>
        <ErrorMessage name='businessEmail' />
      </div>
    </div>
  </div>
  
  )
}

export {Step3}
