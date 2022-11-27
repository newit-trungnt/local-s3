import React from 'react'

export type ButtonProps = {
  label: string
  onClick: () => void
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button className="bg-lime-600 px-1 rounded my-2 text-white" onClick={onClick}>
      {label}
    </button>
  )
}

export default Button