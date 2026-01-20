import { ProductCard } from '@/components/Card/ProductCard'
import { useState } from 'react'
import { Filters } from '@/components/Filters/Filters'
import { useProducts } from '@/hooks/useProducts'
import type { Product } from '@/types/product'
import type { Filter } from '@/types/filter'
import { AddIcon } from '@/components/Icons/AddIcon'
import { CreateProductForm } from '@/components/CreateProductForm/CreateProductForm'
import { Pagination } from '@/components/Pagination/Pagination'
import { usePagination } from '@/hooks/usePagination'

const ITEMS_PER_PAGE = 8

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { products, loading, error } = useProducts()
  const [selectedFilter, setSelectedFilter] = useState<Filter>({
    category: null,
    minPrice: null,
    maxPrice: null,
    search: null,
  })

  const filterProducts = (products: Product[]): Product[] => {
    return Array.isArray(products)
      ? products.filter((product: Product) => {
          return (
            (selectedFilter.category !== null
              ? product.category === selectedFilter.category
              : product.category) &&
            (selectedFilter.minPrice !== null
              ? product.price >= selectedFilter.minPrice
              : product.price) &&
            (selectedFilter.maxPrice !== null
              ? product.price <= selectedFilter.maxPrice
              : product.price) &&
            (selectedFilter.search !== null
              ? product.name
                  .toLowerCase()
                  .includes(selectedFilter.search.toLowerCase())
              : product.name)
          )
        })
      : []
  }

  const filteredProducts = filterProducts(products)

  const { currentPage, totalPages, pageItems, setPage } =
    usePagination<Product>(filteredProducts, ITEMS_PER_PAGE)

  const handleSetFilter: React.Dispatch<React.SetStateAction<Filter>> = (
    updater
  ) => {
    setSelectedFilter((prev) =>
      typeof updater === 'function'
        ? (updater as (p: Filter) => Filter)(prev)
        : updater
    )
    setPage(1)
  }
  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed inset-0 z-[-2] min-h-screen min-w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
        <header className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                Administrador de Productos
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Gestiona, filtra y añade productos a tu catálogo.
              </p>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 rounded-full hover:cursor-pointer bg-black text-white px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md hover:scale-[1.02] transition-transform"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <AddIcon />
              </span>
              <span>Añadir producto</span>
            </button>
          </div>

          <div className="mt-2 rounded-2xl bg-white px-4 py-3 shadow-sm border border-gray-100">
            <Filters setFilter={setSelectedFilter} />
          </div>
        </header>
        <section>
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p>Error loading products: {error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pageItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
          {isOpen && <CreateProductForm onClose={() => setIsOpen(false)} />}
        </section>
      </main>
    </div>
  )
}

export default Home
