export interface Destination {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  category: string
  rating: number
  gallery?: string[]
}


export interface User {
  name: string
  email: string
  password?: string
}


export interface NavLink {
  to: string
  label: string
}


export type ToastSeverity = 'success' | 'error' | 'warning' | 'info'

export interface ToastDetail {
  message: string
  severity?: ToastSeverity
}
