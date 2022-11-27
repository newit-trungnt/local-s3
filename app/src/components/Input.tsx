import React, { HTMLInputTypeAttribute } from 'react'

export type InputProps = {
  type?: HTMLInputTypeAttribute
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}
const Input = ({ type, onChange }: InputProps) => {
  return (
    <input
      type={type || 'text'}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-8"
      placeholder=""
      onChange={(e) => {
        e.preventDefault()
        onChange(e)
      }}
    />
  )
}

export default Input
