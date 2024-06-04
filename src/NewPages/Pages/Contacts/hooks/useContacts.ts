import axios from 'axios'
import {useEffect, useState} from 'react'

// Get Data Type
type TContact = {
  id: number
  name: string
  phone: string
  message: string
  email: string
  created_at: string
  updated_at: string
}

// Post Data Type
interface Contact {
  phone: File
  name: string
  message: string
  email: string
}

export const useContacts = () => {
  const baseUrl = 'http://alrmoz.com/creativity/public'
  const [response, setResponse] = useState<TContact[]>([])
  async function getServiceData() {
    const {data} = await axios.get(`${baseUrl}/api/contacts`)
    setResponse(data.data)
  }

  const [phone, setPhone] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const [loading, setLoading] = useState(false)


  const handleUpload = async () => {
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('phone', phone)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('message', message)

      const response = await axios.post<Contact>(`${baseUrl}/api/contacts`, formData, {
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
    handleUpload,
    handlePhoneChange,
    handleNameChange,
    handleMessageChange,
    handleEmailChange,
    loading
  }
}
