import { ChangeEvent } from "react"

export interface InputProps {
    // id?: string
    name?: string
    type?: 'text' | 'password'
    minLength?: number
    maxLength?: number
    placeholder?: string
    onChange: (value: string) => void
    required?: boolean
}