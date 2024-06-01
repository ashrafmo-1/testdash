

export const Update = () => {
  return (
    <>
      <tr>
        <td>
          <input type='text' className='form-control form-control-solid' placeholder='title' />
        </td>
        <td>
          <input type='file' className='form-control form-control-solid' placeholder='image' />
        </td>
        <td>
          <button type='submit'>Update</button>
        </td>
      </tr>
    </>
  )
}
