import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useBussinesPartner} from './hooks/useBussinesPartner'
import {Spinner} from 'react-bootstrap'

const BussinesPartner = () => {
  const [status, setStatus] = useState(false)
  const navigate = useNavigate()
  const {deleteService, handleImageChange, handleTitleChange, handleUpload, loading, response} =
    useBussinesPartner()

  return (
    <>
      <div className={status ? `d-flex justify-content-end` : `d-flex justify-content-between`}>
        {status ? (
          <h2>شركاء العمل</h2>
        ) : (
          <>
            <button className='btn btn-primary' onClick={() => setStatus(true)}>
              اضافه شريك عمل
            </button>
            <h2>شركاء العمل</h2>
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
                    <label className='required form-label'>العنوان</label>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      placeholder='العنوان'
                      onChange={handleTitleChange}
                    />
                    <label className='required form-label'>الصوره</label>
                    <input
                      type='file'
                      className='form-control form-control-solid'
                      placeholder='اضافه صوره'
                      onChange={handleImageChange}
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
                  <th>العنوان</th>
                  <th>الصوره</th>
                  <th>العمليه</th>
                </tr>
              </thead>
              <tbody className='border-0'>
                {response.map((e) => (
                  <>
                    <tr key={e.id} className='text-center'>
                      <th>{e.title}</th>
                      <th>
                        <img src={e.image} className='w-50 h-75px' alt='' />
                      </th>
                      <th>
                        <div className='d-flex gap-3 justify-content-center'>
                          <button
                            className='btn btn-success'
                            onClick={() => navigate(`/UpdateBussinesPartner/${e.id}`)}
                          >
                            تعديل
                          </button>
                          <button className='btn btn-danger' onClick={() => deleteService(e.id)}>
                            حذف
                          </button>
                        </div>
                      </th>
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

export default BussinesPartner
