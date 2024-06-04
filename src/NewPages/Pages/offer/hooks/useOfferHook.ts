import axios from 'axios'
import {useEffect, useState} from 'react'

// Get Data Type
type TServices = {
  id: number
  title: string
  image: string
  subtitle : string
  created_at: string
  updated_at: string
}

// Post Data Type
interface Offer {
  image: File
  title: string
  subtitle: string
  service_id :number
}

export const useOfferHook = () => {
  const baseUrl = 'http://alrmoz.com/creativity/public'
  const [response, setResponse] = useState<TServices[]>([])
  async function getServiceData() {
    const {data} = await axios.get(`${baseUrl}/api/offers`)
    setResponse(data.data)
  }

  async function deleteService(id: number) {
    await axios.delete(`${baseUrl}/api/offers/${id}`)
    getServiceData() // Refresh the data after deletion
  }

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [title, setTitle] = useState<string>('')
  const [subtitle, setSubtitle] = useState<string>('')
  const [serviceId, setServiceId] = useState<number>(1)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0]
    if (!imageFile) return // Handle empty selection

    // Check if it's an image file
    if (!imageFile.type.startsWith('image/')) {
      console.error('Uploaded file is not an image!')
      return
    }

    setSelectedImage(imageFile)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const handleSubTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(event.target.value)
  }
  const handleServiceId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceId(parseInt(event.target.value, 10))
  }
  const [loading, setLoading] = useState(false)


  const handleUpload = async () => {
    if (!selectedImage) return // Handle no image selected

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('image', selectedImage)
      formData.append('title', title)
      formData.append('subtitle', subtitle.toString())
      formData.append('service_id', serviceId.toString())

      const response = await axios.post<Offer>(`${baseUrl}/api/offers`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Image uploaded successfully:', response.data) // Handle response data
      window.location.reload()
    } catch (error) {
      console.error('Upload failed:', error) // Handle upload errors
    }finally {
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
    handleSubTitle,
    handleServiceId,
    loading
  }
}
