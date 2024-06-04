import axios from 'axios'
import {useEffect, useState} from 'react'

// Get Data Type
type TServices = {
  id: number
  title: string
  image: string
  created_at: string
  updated_at: string
}

// Post Data Type
interface Banner {
  image: File
  title: string
}

export const useBannerHook = () => {
  const baseUrl = 'http://alrmoz.com/creativity/public'
  const [response, setResponse] = useState<TServices[]>([])
  async function getServiceData() {
    const {data} = await axios.get(`${baseUrl}/api/banners`)
    setResponse(data.data)
  }

  const [deleted, setDeleted] = useState(false)

  async function deleteService(id: number) {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?')

    if (confirmDelete) {
      setDeleted(true)
      await axios.delete(`${baseUrl}/api/banners/${id}`)
      getServiceData() // Refresh the data after deletion
      setTimeout(() => {
        setDeleted(false)
      }, 1000)
    } else {
      setDeleted(false)
    }
  }

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [title, setTitle] = useState<string>('')

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0]
    if (!imageFile) return // Handle empty selection

    setSelectedImage(imageFile)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!selectedImage) return // Handle no image selected

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('image', selectedImage)
      formData.append('title', title)

      const response = await axios.post<Banner>(`${baseUrl}/api/banners`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Image uploaded successfully:', response.data) // Handle response data
      window.location.reload()
    } catch (error) {
      console.error('Upload failed:', error) // Handle upload errors
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getServiceData()
  }, [])

  return {
    response,
    deleteService,
    handleUpload,
    handleImageChange,
    handleTitleChange,
    setResponse,
    loading,
    deleted,
  }
}
