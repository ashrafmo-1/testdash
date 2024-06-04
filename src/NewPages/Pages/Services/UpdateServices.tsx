import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Spinner } from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'

interface Services {
  image: File
  title: string
}

export const UpdateServices = () => {
  const {id} = useParams()
  // const [data, setdata] = useState([])
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [title, setTitle] = useState<string>('')
  const naviagte = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    if (!selectedImage) return // Handle no image selected

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', selectedImage)
      formData.append('title', title)

      const response = await axios.post<Services>(
        `http://alrmoz.com/creativity/public/api/services/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      naviagte('/Services')
      console.log('Image uploaded successfully:', response.data) // Handle response data
      window.location.reload()
    } catch (error) {
      console.error('Upload failed:', error) // Handle upload errors
    }
    finally {
      setLoading(false)
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0]
    if (!imageFile) return // Handle empty selection

    setSelectedImage(imageFile)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  useEffect(() => {
    axios.get(`http://alrmoz.com/creativity/public/api/services/${id}`).catch((e) => console.log(e))
  }, [])

  return (
    <>
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
