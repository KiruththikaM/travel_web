export interface Destination {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  category: string
  rating: number
  price?: number
  gallery?: string[]
}


export interface User {
  name: string
  email: string
  password?: string
  role?: 'user' | 'admin'
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

export interface UserBooking {
  id: string
  destinationId: string
  destinationName: string
  destinationImage: string
  destinationCategory: string
  checkIn: string
  checkOut: string
  guests: number
  total: number
  status: 'Pending' | 'Confirmed' | 'Cancelled'
  bookedAt: string
}


export type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled'

export interface AdminBooking {
  id: string
  user: string
  destination: string
  date: string
  status: BookingStatus
  price: number
}


export type CalendarEventType = 'Confirmed' | 'Pending' | 'Blocked'

export interface CalendarEvent {
  type: CalendarEventType
  title: string
  guests: string
  location: string
}

export interface Message {
  id: number
  from: 'admin' | 'user'
  text: string
  time: string
  date: string
}

export interface Conversation {
  id: number
  name: string
  status: 'online' | 'offline'
  tour: string
  lastMsg: string
  lastTime: string
  unread: boolean
  messages: Message[]
}
