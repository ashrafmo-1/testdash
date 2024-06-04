import { AuthModel } from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'

// Function to get authentication details from local storage
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return undefined
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)

  if (!lsValue) {
    return undefined
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    return auth
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
    return undefined
  }
}

// Function to save authentication details to local storage
const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

// Function to remove authentication details from local storage
const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

// Function to setup Axios with authorization headers
export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const auth = getAuth()

      if (auth && auth.access_token) {
        config.headers.Authorization = `Bearer ${auth.access_token}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY }