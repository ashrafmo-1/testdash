import axios from 'axios'
import {useEffect, useState} from 'react'

// Get Data Type
interface User {
  id: number
  phone_numbers: string[] // Fix phone_numbers field to be an array of strings
  created_at: string
  updated_at: string
}

type TUser = {
  phone_numbers: string[]
}

export const useContactDetails = () => {
  const baseUrl = 'http://alrmoz.com/creativity/public'
  const [response, setResponse] = useState<User[]>([])

  async function getServiceData() {
    const {data} = await axios.get(`${baseUrl}/api/contactDetail`)
    setResponse(data.data)
  }

  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([])

  const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPhoneNumbers(value.split(',')) // Assuming the input is comma-separated
  }

  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    try {
      setLoading(true)

      const payload = {
        phone_numbers: phoneNumbers
      }

      const response = await axios.post<TUser>(`${baseUrl}/api/contactDetail`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log('Phone numbers uploaded successfully:', response.data) // Handle response data
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
    handleUpload,
    handlePhoneNumber,
    loading
  }
}
