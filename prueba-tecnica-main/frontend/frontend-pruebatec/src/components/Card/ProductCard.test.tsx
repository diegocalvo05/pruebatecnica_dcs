import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { ProductCard } from './ProductCard'
import type { Product } from '@/types/product'

// Mock del hook
vi.mock('@/hooks/useProducts', () => ({
  useProducts: () => ({
    deleteProduct: vi.fn(),
  }),
}))

describe('ProductCard', () => {
  const product: Product = {
    id: 1,
    name: 'Laptop Pro X1',
    category: 'Electronics',
    description: 'Desc',
    price: 1299.99,
    image: 'https://example.com/img.jpg',
  }

  it('renderiza nombre y precio', () => {
    render(<ProductCard product={product} />)
    expect(screen.getByText('Laptop Pro X1')).toBeInTheDocument()
    expect(screen.getByText('$1299.99')).toBeInTheDocument()
  })

  it('pide confirmación antes de eliminar', async () => {
    const user = userEvent.setup()

    const confirmMock = vi.fn().mockReturnValue(false)

    ;(globalThis as any).confirm = confirmMock

    render(<ProductCard product={product} />)

    await user.click(screen.getByRole('button', { name: /eliminar/i }))

    expect(confirmMock).toHaveBeenCalledTimes(1)
  })
})
