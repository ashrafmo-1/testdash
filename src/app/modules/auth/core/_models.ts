// Interface for the authentication model
export interface AuthModel {
  access_token: string
  token_type: string
  expires_in: number
  user: string[]
  refreshToken?: string
}

// Interface for the user address model
export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

// Interface for the user communication preferences model
export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

// Interface for the user email settings model
export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSinceYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

// Interface for the user social networks model
export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

// Interface for the user model
export interface UserModel {
  id: number
  access_token?: string
  password: string | undefined
  email: string
  name: string
  phone?: string
  image: File
  email_verified_at: string
  created_at: string
  updated_at: string
}