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
interface Services {
  image: File
  title: string
}

export const useServicesHooks = () => {
  const [id, setID] = useState<number>()
  function handleUpdate(id: number) {
    setID(id)
    console.log(id)
  }
  const baseUrl = 'http://alrmoz.com/creativity/public'
  const [response, setResponse] = useState<TServices[]>([])
  const [deleteStatus, setDeleteStatus] = useState(false)
  async function getServiceData() {
    const {data} = await axios.get(`${baseUrl}/api/services`)
    setResponse(data.data)
  }

  async function deleteService(id: number) {
    try {
      await axios.delete(`${baseUrl}/api/services/${id}`)
      getServiceData() // Refresh the data after deletion
    } catch (error: any) {
      console.log(error)
    }finally{
      setDeleteStatus(false)
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

      const response = await axios.post<Services>(`${baseUrl}/api/services`, formData, {
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
    id,
    handleUpdate,
    loading,
    deleteStatus
  }
}
