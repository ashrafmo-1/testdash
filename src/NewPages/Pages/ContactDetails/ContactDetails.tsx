import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useContactDetails} from './hooks/useContactDetails'
import {Spinner} from 'react-bootstrap'

const ContactDetails = () => {
  const [status, setStatus] = useState(false)
  const navigate = useNavigate()
  const {response, loading, handleUpload, handlePhoneNumber} = useContactDetails()

  return (
    <>
      <div className={status ? `d-flex justify-content-end` : `d-flex justify-content-between`}>
        {status ? (
          <h2>تفاصيل ارقام الاتصال</h2>
        ) : (
          <>
            <button className='btn btn-primary' onClick={() => setStatus(true)}>
              اضافه رقم
            </button>
            <h2>تفاصيل ارقام الاتصال</h2>
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
                    <label className='required form-label'>الرقم</label>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      placeholder='الرقم'
                      onChange={handlePhoneNumber}
                    />
                    <button className='btn btn-danger mt-2' onClick={handleUpload}>
                      {loading ? (
                        <>
                          <Spinner animation='border' size='sm'></Spinner> ...تحميل
                        </>
                      ) : (
                        'اضافه'
                      )}
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
                  <th>ارقام الهواتف</th>
                  <th>العمليه</th>
                </tr>
              </thead>
              {response.map((e) =>
                e.phone_numbers.map((phone, index) => (
                  <tr key={`${e.id}-${index}`} className='text-center'>
                    <th>{phone}</th>
                    <th>
                      <button
                        className='btn btn-success'
                        onClick={() => navigate(`/updateContactDetails/${e.id}`)}
                      >
                        تعديل
                      </button>
                    </th>
                  </tr>
                ))
              )}
            </table>
          </div>
        </>
      )}
    </>
  )
}

export default ContactDetails