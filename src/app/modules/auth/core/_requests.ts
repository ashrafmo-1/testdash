import axios from "axios"
import { AuthModel, UserModel } from "./_models"

const API_URL = `http://alrmoz.com/creativity/public`

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/api/authAdmin/admin-profile`
export const LOGIN_URL = `${API_URL}/api/authAdmin/login`
export const REGISTER_URL = `${API_URL}/api/authAdmin/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Function to log in with email and password
// Returns AuthModel
export async function login(email: string, password: string) {
  try {
    return await axios.post<AuthModel>(LOGIN_URL, {
      email,
      password,
    })
  } catch (error) {
    console.error('Error in login:', error)
    throw error
  }
}

// Function to register a user
// Returns AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Function to request a password reset
// Returns { result: boolean } indicating if the email is in the database
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

// Function to get user details by token
export async function getUserByToken(access_token: string) {
  try {
    const config = {
      headers: { Authorization: `Bearer ${access_token}` },
    }
    return await axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, config)
  } catch (error) {
    console.error('Error in getUserByToken:', error)
    throw error
  }
}