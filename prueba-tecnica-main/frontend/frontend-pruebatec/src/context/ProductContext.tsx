import { createContext } from 'react'
import type { ProductsContextType } from './Products.types'

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
)
