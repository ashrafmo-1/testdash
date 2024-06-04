import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSocialMediaLinks} from './hook/useSocialMediaLinks'
import { Spinner } from 'react-bootstrap'

const SocialMediaLinks = () => {
  const [status, setStatus] = useState(false)
  const navigate = useNavigate()
  const {handleUrl, handlePlatform, handleUpload, response ,loading} = useSocialMediaLinks()

  return (
    <>
      <div className={status ? `d-flex justify-content-end` : `d-flex justify-content-between`}>
        {status ? (
          <h2>روابط مواقع التواصل الاجتماعي</h2>
        ) : (
          <>
            <button className='btn btn-primary' onClick={() => setStatus(true)}>
             اضافه رابط
            </button>
            <h2>روابط مواقع التواصلا الاجتماعي</h2>
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
                    <label className='required form-label'>المنصه</label>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      placeholder='المنصه'
                      onChange={handlePlatform}
                    />
                    <label className='required form-label'>الرابط</label>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      placeholder='الرابط'
                      onChange={handleUrl}
                    />
                    <button className='btn btn-primary mt-2' onClick={handleUpload}>
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
                  <th>عنوان المنصه</th>
                  <th>الصعوره</th>
                  <th>العمليه</th>
                </tr>
              </thead>
              <tbody className='border-0'>
                {response.map((e) => (
                  <>
                    <tr key={e.id} className='text-center'>
                      <th>{e.platform}</th>
                      <th>{e.url}</th>
                      <th>
                        <div className='d-flex gap-3 justify-content-center'>
                          <button
                            className='btn btn-success '
                            onClick={() => navigate(`/updateSocialMedia/${e.id}`)}
                          >
                            تعديل
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

export default SocialMediaLinks
