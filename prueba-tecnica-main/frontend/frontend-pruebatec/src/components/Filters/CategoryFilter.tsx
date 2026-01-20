import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Filter } from '@/types/filter'
import { useState, useEffect } from 'react'

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
  resetKey: number
}

export const CategoryFilter = ({ setFilter, resetKey }: Props) => {
  return (
    <Select
      key={resetKey}
      onValueChange={(value: string) => {
        setFilter((prev) => ({ ...prev, category: value }))
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Electronics">Electronics</SelectItem>
        <SelectItem value="Clothing">Clothing</SelectItem>
        <SelectItem value="Home">Home</SelectItem>
        <SelectItem value="Accessories">Accessories</SelectItem>
        <SelectItem value="Sports">Sports</SelectItem>
      </SelectContent>
    </Select>
  )
}
