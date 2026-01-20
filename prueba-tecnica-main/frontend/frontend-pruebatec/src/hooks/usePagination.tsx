import { useMemo, useState } from 'react'

export interface UsePaginationResult<T> {
  currentPage: number
  totalPages: number
  pageItems: T[]
  goToPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  setPage: (page: number) => void
}

export const usePagination = <T,>(
  items: T[],
  itemsPerPage: number
): UsePaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage))

  const safePage = Math.min(currentPage, totalPages)

  const pageItems = useMemo(() => {
    const startIndex = (safePage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, itemsPerPage, safePage])

  const goToPage = (page: number) => {
    const normalized = Math.min(Math.max(1, page), totalPages)
    setCurrentPage(normalized)
  }

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  return {
    currentPage: safePage,
    totalPages,
    pageItems,
    goToPage,
    nextPage,
    prevPage,
    setPage: goToPage,
  }
}
