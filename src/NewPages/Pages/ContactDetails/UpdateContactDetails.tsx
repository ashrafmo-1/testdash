import axios from 'axios'
import {useState} from 'react'
import { Spinner } from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'

interface ContactDetails {
  phone_numbers: string[]
}

export const UpdateContactDetails = () => {
  const {id} = useParams()

  const [phoneNumber, setPhoneNumber] = useState<string[]>([])
  const navigate = useNavigate()

  const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber([event.target.value])
  }
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    try {
      setLoading(true)

      // Replace with the correct endpoint URL from your API documentation
      const apiEndpoint = `http://your-api-domain/your-api-path/update/${id}`

      const formData = new FormData()
      formData.append('Phone_Number', phoneNumber.join(','))

      const response = await axios.post<ContactDetails>(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      navigate('/ContactDetails')
      console.log('Contact details updated successfully:', response.data)
    } catch (error) {
      console.error('Failed to update contact details:', error)
      // Handle errors appropriately, e.g., display error message to the user
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='col-12 d-flex justify-content-center'>
        <div className='card p-3 w-50'>
          <div className='mb-10'>
            <label className='required form-label'>الرقم</label>
            <input
              type='text'
              className='form-control form-control-solid'
              placeholder='الرقم'
              onChange={handlePhoneNumber}
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
