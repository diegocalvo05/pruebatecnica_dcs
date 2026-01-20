import { Button } from '@/components/ui/button'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Modal } from './Modal'
import { useState, type FormEvent } from 'react'
import { useProducts } from '@/hooks/useProducts'
import type { newProduct } from '@/services/products.service'

interface Props {
  onClose: () => void
}

export function CreateProductForm({ onClose }: Props) {
  const { createNewProduct, loading } = useProducts()
  const [category, setCategory] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(e.currentTarget)

    const name = (formData.get('name') ?? '').toString().trim()
    const priceStr = (formData.get('price') ?? '').toString()
    const description = (formData.get('description') ?? '').toString().trim()
    const image = (formData.get('image') ?? '').toString().trim()

    const payload: newProduct = {
      name,
      price: Number(priceStr),
      description,
      category: category.trim(),
      image,
    }

    void (async () => {
      const ok = await createNewProduct(payload)
      if (ok) {
        form.reset()
        setCategory('')
        onClose()
      }
    })()
  }

  return (
    <Modal onClose={onClose}>
      <div className="w-full max-w-4xl">
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldLegend>Producto Nuevo</FieldLegend>
            <FieldDescription>
              Complete la información del nuevo producto
            </FieldDescription>
            <FieldSeparator />
            <FieldGroup>
              <Field orientation="responsive">
                <FieldContent>
                  <FieldLabel htmlFor="name">Nombre</FieldLabel>
                  <FieldDescription>
                    Proporcione el nombre del producto
                  </FieldDescription>
                </FieldContent>
                <Input
                  id="name"
                  name="name"
                  placeholder="Smartphone"
                  required
                />
              </Field>
              <Field orientation="responsive">
                <FieldContent>
                  <FieldLabel htmlFor="category">Categoria</FieldLabel>
                  <FieldDescription>
                    Proporcione la categoria del producto
                  </FieldDescription>
                </FieldContent>
                <Select
                  onValueChange={(value: string) => {
                    setCategory(value)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field orientation="responsive">
                <FieldContent>
                  <FieldLabel htmlFor="lastName">
                    Descripción del producto
                  </FieldLabel>
                  <FieldDescription>
                    Escriba la descripción del producto, máximo 100 caracteres
                  </FieldDescription>
                </FieldContent>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Descripción..."
                  required
                  className="min-h-[100px] resize-none sm:min-w-[300px]"
                />
              </Field>
              <Field orientation="responsive">
                <FieldContent>
                  <FieldLabel htmlFor="price">Precio</FieldLabel>
                </FieldContent>
                <Input
                  id="price"
                  name="price"
                  type="float"
                  placeholder="$"
                  required
                />
              </Field>
              <Field orientation="responsive">
                <FieldContent>
                  <FieldLabel htmlFor="image">Imagen</FieldLabel>
                </FieldContent>
                <Input
                  id="image"
                  name="image"
                  placeholder="Url imagen"
                  required
                />
              </Field>
              <FieldSeparator />
              <Field orientation="responsive">
                <Button type="submit">Subir</Button>
                <Button onClick={onClose} type="button" variant="outline">
                  Cancelar
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </Modal>
  )
}
