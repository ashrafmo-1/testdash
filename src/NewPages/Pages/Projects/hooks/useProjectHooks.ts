import axios from 'axios'
import { useEffect, useState } from 'react'

// Get Data Type
type TServices = {
  id: number
  title: string
  imageUrl: string
  videoUrl: string
  created_at: string
  updated_at: string
}

// Post Data Type
interface Services {
  imageUrl: File
  title: string
}

export const useProjectHooks = () => {
  const [id, setID] = useState<number>()
  function handleUpdate(id: number) {
    setID(id)
    console.log(id)
  }
  const baseUrl = 'http://alrmoz.com/creativity/public'
  const [response, setResponse] = useState<TServices[]>([])
  async function getServiceData() {
    const { data } = await axios.get(`${baseUrl}/api/projects`)
    setResponse(data.data)
  }

  async function deleteService(id: number) {
    await axios
      .delete(`${baseUrl}/api/delete/project/${id}`)
      .then(() => alert('Deleted Successfully'));
    getServiceData(); // Refresh the data after deletion
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

      const response = await axios.post<Services>(`${baseUrl}/api/add/project`, formData, {
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
    getServiceData
  }
}
