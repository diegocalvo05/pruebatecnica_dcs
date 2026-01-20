import type { Product } from '../types/product'

export interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
}

export type ProductsAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'CREATE_SUCCESS'; payload: Product }
  | { type: 'DELETE_SUCCESS'; payload: Product['id'] }

export interface ProductsContextType {
  state: ProductsState
  dispatch: React.Dispatch<ProductsAction>
}
