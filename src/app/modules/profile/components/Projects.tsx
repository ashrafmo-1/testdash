import {useState} from 'react'
import {useProjectHooks} from './useProjectHooks'
/* eslint-disable jsx-a11y/anchor-is-valid */
export function Projects() {
  const [status, setStatus] = useState(false)
  const {deleteService, response, handleInputChange, handleSubmit} = useProjectHooks()
  return (
    <>
      <div className={status ? `d-flex justify-content-end` : `d-flex justify-content-between`}>
        {status ? (
          <h2>Projects</h2>
        ) : (
          <>
            <button className='btn btn-secondary' onClick={() => setStatus(true)}>
              Add Project
            </button>
            <h2>Projects</h2>
          </>
        )}
      </div>
      {status ? (
        <>
          <div className='container mt-5    '>
            <div className='row'>
              <div className='col-12 d-flex justify-content-center'>
                <div className='card p-3 w-50'>
                  <form onSubmit={handleSubmit}>
                    <div className='mb-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        اسم المشروع
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder='اضافه لافته'
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='mb-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        الصوره
                      </label>
                      <input
                        type='file'
                        className='form-control form-control-solid'
                        placeholder='اضافه صوره'
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='mb-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        الفيديو
                      </label>
                      <input
                        type='file'
                        className='form-control form-control-solid'
                        placeholder='اضافه فيديو'
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='w-100 d-flex justify-content-end'>
                      <button type='submit' className='btn btn-info mt-3'>
                        اضافه
                      </button>
                    </div>
                  </form>
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
                <th>Video</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody className='border-0'>
              {response.map((e) => (
                <tr key={e.id} className='text-center'>
                  <th className='fw-bold'>{e.title}</th>
                  <th>
                    <img src={e.imageUrl} className='w-50 h-75px' alt={e.title} />
                  </th>
                  <th>
                    <video src={e.videoUrl} className='w-50 h-75px' />
                  </th>
                  <th>
                    <div className='d-flex gap-3 justify-content-center'>
                      <button className='btn btn-danger'>تحديث</button>
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
