import { useContext } from 'react'
import { ProductsContext } from '../context/ProductContext'
import {
  createProduct,
  deleteProductById,
  type newProduct,
} from '@/services/products.service'
import type { Product } from '@/types/product'

export const useProducts = () => {
  const context = useContext(ProductsContext)

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }

  const { state, dispatch } = context

  const createNewProduct = async (product: newProduct): Promise<boolean> => {
    dispatch({ type: 'FETCH_START' })
    try {
      const created = await createProduct(product)
      dispatch({ type: 'CREATE_SUCCESS', payload: created })
      return true
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error instanceof Error ? error.message : 'Unknown error',
      })
      return false
    }
  }

  const deleteProduct = async (id: Product['id']): Promise<boolean> => {
    dispatch({ type: 'FETCH_START' })
    try {
      await deleteProductById(id)
      dispatch({ type: 'DELETE_SUCCESS', payload: id })
      return true
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error instanceof Error ? error.message : 'Unknown error',
      })
      return false
    }
  }

  return {
    products: state.products,
    loading: state.loading,
    error: state.error,
    createNewProduct,
    deleteProduct,
  }
}
