import React, {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'
import { AuthModel, UserModel } from './_models'
import * as authHelper from './AuthHelpers'
import { getUserByToken } from './_requests'

// Define the type for the AuthContextProps
type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}

// Initial state for the AuthContext
const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

// Create AuthContext with initial state
const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

// Custom hook to use the AuthContext
const useAuth = () => {
  return useContext(AuthContext)
}

// AuthProvider component
const AuthProvider: FC = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  return (
    <AuthContext.Provider value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// AuthInit component to initialize authentication
const AuthInit: FC = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    const requestUser = async (access_token: string) => {
      try {
        if (!didRequest.current) {
          const { data } = await getUserByToken(access_token)
          if (data) {
            setCurrentUser(data)
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }
    }

    if (auth && auth.access_token) {
      requestUser(auth.access_token)
    } else {
      logout()
      setShowSplashScreen(false)
    }

    // Cleanup function to set didRequest to true
    return () => {
      didRequest.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, logout, setCurrentUser])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { AuthProvider, AuthInit, useAuth }