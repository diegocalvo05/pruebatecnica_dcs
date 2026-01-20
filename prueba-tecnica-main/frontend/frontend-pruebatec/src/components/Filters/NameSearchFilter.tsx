import React, { useEffect, useState, type ChangeEvent } from 'react'
import type { Filter } from '@/types/filter'

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
  resetKey: number
}

export const NameSearchFilter = ({ setFilter, resetKey }: Props) => {
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setValue('')
    setFilter(
      (prev: Filter): Filter => ({
        ...prev,
        search: '',
      })
    )
  }, [resetKey, setFilter])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)

    setFilter(
      (prev: Filter): Filter => ({
        ...prev,
        search: newValue,
      })
    )
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Buscar por nombre..."
      className="bg-white border border-gray-300 rounded-md px-3 py-2 w-full placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
    />
  )
}
