import {useState} from 'react'
import {useBannerHook} from '../PageHooks/useBannerHook'

const Banners = () => {
  const [status, setStatus] = useState(false)
  const {deleteService, handleImageChange, handleTitleChange, handleUpload, response} =
    useBannerHook()

  return (
    <>
      <div className={status ? `d-flex justify-content-end` : `d-flex justify-content-between`}>
        {status ? (
          <h2>Banners</h2>
        ) : (
          <>
            <button className='btn btn-secondary' onClick={() => setStatus(true)}>
              Add Banner
            </button>
            <h2>Banners</h2>
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
                    <label className='required form-label'>title</label>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      placeholder='title'
                      onChange={handleTitleChange}
                    />
                    <label className='required form-label'>title</label>
                    <input
                      type='file'
                      className='form-control form-control-solid'
                      placeholder='image'
                      onChange={handleImageChange}
                    />
                    <button className='btn btn-danger mt-2' onClick={handleUpload}>
                      Upload
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
                <th>Title</th>
                <th>Image</th>
                <th>Start_date</th>
                <th>Updated_Date</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody className='border-0'>
              {response.map((e) => (
                <tr key={e.id} className='text-center'>
                  <th>{e.title}</th>
                  <th>
                    <img src={e.image} className='w-50 h-75px' alt={e.title} />
                  </th>
                  <th>{e.created_at}</th>
                  <th>{e.updated_at}</th>
                  <th>
                    <div className='d-flex gap-3 justify-content-center'>
                      <button className='btn btn-update'>تحديث</button>
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
export default Banners
