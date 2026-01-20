import type { ProductsState, ProductsAction } from './Products.types'

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
}

export function productsReducer(
  state: ProductsState,
  action: ProductsAction
): ProductsState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload }

    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }

    case 'CREATE_SUCCESS':
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      }

    case 'DELETE_SUCCESS':
      return {
        ...state,
        loading: false,
        products: state.products.filter((p) => p.id !== action.payload),
      }

    default:
      return state
  }
}
