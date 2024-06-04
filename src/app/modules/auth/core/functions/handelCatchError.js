import SwalShowAlert from "./swal/SwalShowAlert"

export default function HandelCatchError(error) {
  const validationErrorsObject = error.response?.data?.error || error.response?.data?.errors
  if (validationErrorsObject) {
    return SwalShowAlert('error', Object.values(validationErrorsObject)[0][0])
  }


  if (error.response?.data?.message?.includes("SQLSTATE")) {
    SwalShowAlert('error', "Error")
  } else {
    SwalShowAlert('error', error.response?.data?.error || error.response?.data?.message || error.response?.data || "Something went wrong. Please try again later.")
  }
}