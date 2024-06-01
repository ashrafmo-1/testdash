import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {BuilderPage} from './BuilderPage'
import { t } from 'i18next'

const BuilderPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>{t('Layout Builder')}</PageTitle>
      <BuilderPage />
    </>
  )
}

export default BuilderPageWrapper
