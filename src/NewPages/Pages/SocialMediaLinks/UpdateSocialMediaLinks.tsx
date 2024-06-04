import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Spinner } from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'
import * as yup from 'yup' // Install yup for validation (npm install yup)

interface SocialMedia {
  url: string
  platform: string
}

const socialMediaSchema = yup.object({
  url: yup.string().url('Please enter a valid URL').required('URL is required'),
  platform: yup.string().required('Platform is required'),
})

export const UpdateSocialMediaLinks = () => {
  const {id} = useParams()
  const [url, setUrl] = useState<string>('')
  const [platform, setPlatform] = useState<string>('')
  const naviagte = useNavigate()  
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    try {
      setLoading(true)

      await socialMediaSchema.validate({url, platform})
      const formData = new FormData()
      formData.append('url', url)
      formData.append('platform', platform)

      const response = await axios.post<SocialMedia>(
        `http://alrmoz.com/creativity/public/api/socialMediaLinks/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      naviagte('/socialmedialinks')
      console.log('Image uploaded successfully:', response.data) // Handle response data
      window.location.reload()
    } catch (error) {
      console.error('Upload failed:', error) // Handle upload errors
    } finally {
      setLoading(false)
    }
  }

  const handleUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }

  const handlePlatForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlatform(event.target.value)
  }

  useEffect(() => {
    axios.get(`http://alrmoz.com/creativity/public/aapi/socialMediaLinks/${id}`).catch((e) => console.log(e))
  }, [])

  return (
    <>
      <div className='col-12 d-flex justify-content-center'>
        <div className='card p-3 w-50'>
          <div className='mb-10'>
            <label className='required form-label'>المنصه</label>
            <input
              type='text'
              className='form-control form-control-solid'
              placeholder='المنصه'
              onChange={handlePlatForm}
            />
            <label className='required form-label'>الرابط</label>
            <input
              type='text'
              className='form-control form-control-solid'
              placeholder='الرابط'
              onChange={handleUrl}
            />
            <button className='btn btn-danger mt-2' onClick={handleUpdate}>
              {loading ? <>
                <Spinner animation="border" size="sm"></Spinner> ...تحميل
              </> : "تعديل"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
