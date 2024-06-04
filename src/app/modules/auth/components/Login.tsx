import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {useAuth} from '../core/Auth'
import {t} from 'i18next'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(t('Wrong email format'))
    .min(3, t('Minimum 3 symbols'))
    .max(50, t('Maximum 50 symbols'))
    .required(t('Email is required')),
  password: Yup.string()
    .min(3, t('Minimum 3 symbols'))
    .max(50, t('Maximum 50 symbols'))
    .required(t('Password is required')),
})
// valus input validation
const initialValues = {
  email: 'ibdaa@almuhtarifeen.com',
  password: 'CreativityAdmin_1',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true);
      setStatus(null);
      try {
        const {data: admin} = await login(values.email, values.password)
        saveAuth(admin)
        const {data: adminData} = await getUserByToken(admin.access_token)
        setCurrentUser(adminData)
      } catch (error : any) {
        console.error(error)
        saveAuth(undefined)
        if (error.message === 'Network Error') {
          setStatus(
            t('حدث خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.')
          )
        } else {
          setStatus(t('The login detail is incorrect'))
        }
        setSubmitting(false);
        setLoading(false);
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>{t('تسجيل الدخول في ابداع المحترفين')}</h1>
      </div>
      {/* begin::Heading */}
      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>{t('Email')}</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {'is-valid': formik.touched.email && !formik.errors.email}
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>

      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>{t('Password')} </label>
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.password && formik.errors.password},
            {'is-valid': formik.touched.password && !formik.errors.password}
          )}
          name='password'
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>

      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>{t('Continue')}</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              {t('Please wait...')}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </form>
  )
}
