import axios from 'axios'
import {useEffect, useState} from 'react'
import * as yup from 'yup' // Install yup for validation (npm install yup)

// Get Data Type
type TSocialMedia = {
  id: number
  url: string
  platform: string
  created_at: string
  updated_at: string
}

// Post Data Type
interface SocialMedia {
  url: string
  platform: string
}

const socialMediaSchema = yup.object({
  url: yup.string().url('Please enter a valid URL').required('URL is required'),
  platform: yup.string().required('Platform is required'),
})

export const useSocialMediaLinks = () => {
  const baseUrl = 'http://alrmoz.com/creativity/public'
  const [response, setResponse] = useState<TSocialMedia[]>([])
  async function getServiceData() {
    const {data} = await axios.get(`${baseUrl}/api/socialMediaLinks`)
    setResponse(data.data)
  }

  const [url, setUrl] = useState<string>('')
  const [platform, setPlatform] = useState<string>('') // Corrected typo in variable name

  const handleUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }

  const handlePlatform = (event: React.ChangeEvent<HTMLInputElement>) => { // Corrected function name
    setPlatform(event.target.value) // Corrected variable name
  }

  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    try {
      setLoading(true)
      await socialMediaSchema.validate({url, platform}) // Validate using correct platform variable

      const formData = new FormData()
      formData.append('url', url)
      formData.append('platform', platform) // Corrected variable name

      const response = await axios.post<SocialMedia>(`${baseUrl}/api/socialMediaLinks`, formData, {
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
    handleUpload,
    handleUrl,
    handlePlatform, // Corrected function name
    loading
  }
}
