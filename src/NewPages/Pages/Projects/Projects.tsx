import {useState, useEffect} from 'react'
import {useProjectHooks} from './hooks/useProjectHooks'
import {useNavigate} from 'react-router-dom'
import {Spinner} from 'react-bootstrap'
/* eslint-disable jsx-a11y/anchor-is-valid */
export function Projects() {
  const [status, setStatus] = useState(false)
  const navigate = useNavigate()
  const {deleteService, response, getServiceData, handleImageChange, handleTitleChange, handleUpload, loading} =
    useProjectHooks()

  useEffect(() => {
    if (response) {
      getServiceData()
    }
  }, [response])

  return (
    <>
      <div className={status ? `d-flex justify-content-end` : `d-flex justify-content-between`}>
        {status ? (
          <h2>المشاريع</h2>
        ) : (
          <>
            <button className='btn btn-primary' onClick={() => setStatus(true)}>
              اضافه مشروع
            </button>
            <h2>المشاريع</h2>
          </>
        )}
      </div>
      {status ? (
        <>
          <div className='container mt-5    '>
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
                      placeholder='الصوره'
                      onChange={handleImageChange}
                    />
                    <button className='btn btn-danger mt-2' onClick={handleUpload}>
                      {loading ? (
                        <>
                          <Spinner animation='border' size='sm'></Spinner> loading...
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
        <div className='pt-2'>
          <table className='table gs-7 gy-7 gx-7 table-hover border '>
            <thead className='border-0'>
              <tr className='fw-bold fs-6 text-gray-800 border-bottom border-gray-200 text-center'>
                <th>العنوان</th>
                <th>الصوره</th>
                <th>الفيديو</th>
                <th>العمليه</th>
              </tr>
            </thead>
            <tbody className='border-0'>
              {response && response.map((e) => (
                <tr key={e.id} className='text-center'>
                  <th className='fw-bold'>{e.title}</th>
                  <th>
                    {e.imageUrl ? (
                      <img src={e.imageUrl} className='w-50 h-75px' alt={e.title} />
                    ) : (
                      <span>لا يوجد صوره</span>
                    )}
                  </th>
                  <th>
                    {e.videoUrl ? (
                      <video src={e.videoUrl} className='w-50 h-75px' controls />
                    ) : (
                      <span>لا يوجد فيديو</span>
                    )}
                  </th>
                  <th>
                    <div className='d-flex gap-3 justify-content-center'>
                      <button
                        className='btn btn-success'
                        onClick={() => navigate(`/updateProject/${e.id}`)}
                      >
                        تحديث
                      </button>
                      <button className='btn btn-danger' onClick={() => deleteService(e.id)}>
                        حذف
                      </button>
                    </div>
                  </th>
                </tr> 
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
