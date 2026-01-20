import { useReducer, useEffect, type ReactNode } from 'react'
import { productsReducer, initialState } from './ProductReducer'
import { fetchProducts } from '../services/products.service'
import { ProductsContext } from './ProductContext'

interface Props {
  children: ReactNode
}

export const ProductsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(productsReducer, initialState)

  useEffect(() => {
    async function loadProducts() {
      dispatch({ type: 'FETCH_START' })

      try {
        const products = await fetchProducts()
        dispatch({ type: 'FETCH_SUCCESS', payload: products })
      } catch (error) {
        dispatch({
          type: 'FETCH_ERROR',
          payload: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    void loadProducts()
  }, [])

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  )
}
