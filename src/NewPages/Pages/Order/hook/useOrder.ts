import axios from 'axios'
import {useEffect, useState} from 'react'

// Get Data Type
type TServices = {
  id: number
  name: string
  phone: string
  email: string
  status: string
  created_at: string
  updated_at: string
}

// Post Data Type
interface Services {
  image: File
  title: string
}

export const useOrder = () => {
  const baseUrl = 'http://alrmoz.com/creativity/public'
  const [response, setResponse] = useState<TServices[]>([])
  async function getServiceData() {
    const {data} = await axios.get(`${baseUrl}/api/orders`)
    setResponse(data.data)
  }

  async function deleteService(id: number) {
    await axios.delete(`${baseUrl}/api/orders/${id}`)
    getServiceData() // Refresh the data after deletion
  }

  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setName(event.target.value)
  }

  const handePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value)
  }
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const [loading, setLoading] = useState(false)


  const handleUpload = async () => {
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('phone', phone)

      const response = await axios.post<Services>(`${baseUrl}/api/orders`, formData, {
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
    handleNameChange,
    handePhoneChange,
    handleEmailChange,
    loading
  }
}
