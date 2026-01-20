import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  const handlePrev = () => {
    onPageChange(Math.max(1, currentPage - 1))
  }

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1))
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav className="mt-6 flex items-center justify-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Anterior
      </Button>

      {pages.map((page) => {
        const isActive = page === currentPage
        return (
          <Button
            key={page}
            type="button"
            size="icon"
            variant={isActive ? 'default' : 'outline'}
            className="h-8 w-8 text-sm"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        )
      })}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </Button>
    </nav>
  )
}
