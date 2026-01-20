import { useState } from 'react'
import { CategoryFilter } from './CategoryFilter'
import { PriceRangeFilter } from './PriceRangeFilter'
import type { Filter } from '@/types/filter'
import { Button } from '../ui/button'
import { NameSearchFilter } from './NameSearchFilter'

interface FiltersProps {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

export const Filters = ({ setFilter }: FiltersProps) => {
  const [resetKey, setResetKey] = useState<number>(0)

  const handleOnClick = () => {
    setFilter({
      category: null,
      minPrice: null,
      maxPrice: null,
      search: null,
    })
    setResetKey((prevKey) => prevKey + 1)
  }

  return (
    <section className="flex flex-row justify-center gap-x-4">
      <CategoryFilter setFilter={setFilter} resetKey={resetKey} />
      <PriceRangeFilter setFilter={setFilter} resetKey={resetKey} />
      <NameSearchFilter setFilter={setFilter} resetKey={resetKey} />
      <Button
        onClick={handleOnClick}
        className="hover:cursor-pointer"
        variant="outline"
      >
        Reiniciar Filtros
      </Button>
    </section>
  )
}
