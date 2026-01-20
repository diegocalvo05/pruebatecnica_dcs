import type { Product } from '../types/product'

const API_URL = import.meta.env.VITE_API_URL

export type newProduct = Omit<Product, 'id'>

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const data: unknown = await response.json()
    return data as Product[]
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const createProduct = async (product: newProduct): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      throw new Error('Failed to create product')
    }

    const data: unknown = await response.json()
    return data as Product
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

export const deleteProductById = async (id: Product['id']): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete product')
    }
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}
