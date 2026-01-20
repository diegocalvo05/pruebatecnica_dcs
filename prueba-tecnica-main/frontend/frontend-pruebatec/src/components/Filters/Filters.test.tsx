import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { Filters } from './Filters'
import type { Filter } from '@/types/filter'

describe('Filters', () => {
  it('reinicia filtros al dar click', async () => {
    const user = userEvent.setup()

    const setFilter = vi.fn() as unknown as React.Dispatch<
      React.SetStateAction<Filter>
    >

    render(<Filters setFilter={setFilter} />)

    await user.click(screen.getByRole('button', { name: /reiniciar filtros/i }))

    expect(setFilter).toHaveBeenCalledWith({
      category: null,
      minPrice: null,
      maxPrice: null,
      search: null,
    })
  })
})
