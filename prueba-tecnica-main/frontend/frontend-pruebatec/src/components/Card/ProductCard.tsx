import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Product } from '@/types/product'
import { useProducts } from '@/hooks/useProducts'

export const ProductCard = ({ product }: { product: Product }) => {
  const { deleteProduct } = useProducts()

  const handleDelete = () => {
    const confirmed = window.confirm(
      `¿Seguro que quieres eliminar "${product.name}"?`
    )
    if (!confirmed) return

    void deleteProduct(product.id)
  }

  return (
    <Card
      className="flex h-full flex-col justify-between
        rounded-2xl
        bg-white/45
        backdrop-blur-md
        border border-white/20
        shadow-sm
        hover:bg-white/55
        hover:shadow-md
        transition-all"
    >
      <CardHeader className="space-y-1 text-center">
        <div className="flex flex-col justify-center gap-1">
          <CardTitle className="text-base font-semibold">
            {product.name}
          </CardTitle>
          <p className="text-sm font-medium text-gray-500">
            {product.category}
          </p>
        </div>
        <CardDescription className="text-xs text-gray-500 line-clamp-3">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3 pt-0">
        <img
          src={product.image}
          className="w-full h-auto object-cover rounded-md mb-4"
        />
        <p className="text-l font-semibold text-gray-800">{`$${product.price}`}</p>
      </CardContent>

      <CardFooter className="flex flex-row justify-center gap-x-4">
        <Button
          className="hover:cursor-pointer"
          onClick={handleDelete}
          variant="outline"
        >
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  )
}
