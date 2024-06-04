import {useState} from 'react'
import {useContacts} from './hooks/useContacts'
import { Spinner } from 'react-bootstrap'

const Contacts = () => {
  const [status, setStatus] = useState(false)
  const {
    response,
    handleNameChange,
    handlePhoneChange,
    handleUpload,
    handleEmailChange,
    handleMessageChange,
    loading
  } = useContacts()

  return (
    <>
      <div className={status ? `d-flex justify-content-end` : `d-flex justify-content-between`}>
        {status ? (
          <h2>الاتصالات</h2>
        ) : (
          <>
            <button className='btn btn-primary' onClick={() => setStatus(true)}>
              اضافه اتصال
            </button>
            <h2>الاتصالات</h2>
          </>
        )}
      </div>
      {status ? (
        <>
          <div className='container mt-5'>
            <div className='row'>
              <div className='col-12 d-flex justify-content-center'>
                <div className='card p-3 w-50'>
                  <div className='mb-10'>
                    <label className='required form-label'>الاسم</label>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      placeholder='الاسم'
                      onChange={handleNameChange}
                    />
                    <label className='required form-label'>الايميل</label>
                    <input
                      type='email'
                      className='form-control form-control-solid'
                      placeholder='الايميل'
                      onChange={handleEmailChange}
                    />
                    <label className='required form-label'>رقم الهاتف</label>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      placeholder='رقم الهاتف'
                      onChange={handlePhoneChange}
                    />
                    <label className='required form-label'>رساله</label>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      placeholder='رساله'
                      onChange={handleMessageChange}
                    />
                    <button className='btn btn-danger mt-2' onClick={handleUpload}>
                      {loading ? <>
                        <Spinner animation="border" size="sm"></Spinner> ...تحميل
                      </> : "اضافه"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='pt-2'>
            <table className='table gs-7 gy-7 gx-7 table-hover border w-100'>
              <thead className='border-0'>
                <tr className='fw-bold fs-6 text-gray-800 border-bottom border-gray-200 text-center'>
                  <th>الاسم</th>
                  <th>رقم الهاتف</th>
                  <th>created_at</th>
                  <th>Updated_Date</th>
                </tr>
              </thead>
              <tbody className='border-0'>
                {response.map((e) => (
                  <>
                    <tr key={e.id} className='text-center'>
                      <th>{e.name}</th>
                      <th>{e.phone}</th>
                      <th>{e.created_at}</th>
                      <th>{e.updated_at}</th>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}

export default Contacts
