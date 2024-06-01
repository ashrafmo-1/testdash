import axios, {AxiosResponse} from 'axios'
import {useEffect, useState} from 'react'
type TServices = {
  id: number
  title: string
  imageUrl: string
  videoUrl : string
}

interface FormData {
  title: string
  imageUrl?: File
  videoUrl?: File

}
export const useProjectHooks = () => {
  const [formData, setFormData] = useState<FormData>({title: '', imageUrl: null || undefined , videoUrl : null || undefined })
  const [response, setResponse] = useState<TServices[]>([])
  async function getServiceData() {
    const {data} = await axios.get(`http://alrmoz.com/creativity/public/api/projects`)
    setResponse(data.data)
  }

  async function deleteService(id: number) {
    await axios.delete(`http://alrmoz.com/creativity/public/api/delete/project/${id}`)
    getServiceData() // Refresh the data after deletion
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      const response: AxiosResponse<any> = await axios.post(
        'http://alrmoz.com/creativity/public/api/add/project',
        formData
      )
      alert('Add Success')
      window.location.reload()
      console.log('Response:', response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    getServiceData()
  }, [])

  return {response, setResponse, deleteService, handleSubmit, handleInputChange}
}
