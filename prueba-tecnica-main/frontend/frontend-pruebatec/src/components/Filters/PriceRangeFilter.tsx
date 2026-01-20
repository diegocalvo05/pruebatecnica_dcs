import type { Filter } from '@/types/filter'
import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
  resetKey: number
}

export const PriceRangeFilter = ({ setFilter, resetKey }: Props) => {
  const [min, setMin] = useState<string>('')
  const [max, setMax] = useState<string>('')

  useEffect(() => {
    setMin('')
    setMax('')
  }, [resetKey])

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const minPrice = e.target.value
    setMin(minPrice)

    setFilter(
      (prevFilter: Filter): Filter => ({
        ...prevFilter,
        minPrice: minPrice !== '' ? parseFloat(minPrice) : null,
      })
    )
  }

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const maxPrice = e.target.value
    setMax(maxPrice)

    setFilter(
      (prevFilter: Filter): Filter => ({
        ...prevFilter,
        maxPrice: maxPrice !== '' ? parseFloat(maxPrice) : null,
      })
    )
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <input
        type="number"
        placeholder="Min $"
        value={min}
        onChange={handleMinChange}
        className="bg-white border border-gray-300 rounded-md px-2 py-1 w-20 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <span className="text-gray-400">-</span>
      <input
        type="number"
        placeholder="Max $"
        value={max}
        onChange={handleMaxChange}
        className="bg-white border border-gray-300 rounded-md px-2 py-1 w-20 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  )
}
