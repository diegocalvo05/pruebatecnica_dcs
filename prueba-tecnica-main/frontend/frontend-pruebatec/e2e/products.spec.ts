import { test, expect } from '@playwright/test'

test('muestra el título y algunos productos', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Administrador de Productos' })
  ).toBeVisible()

  await expect(page.getByText('Laptop Pro X1')).toBeVisible()
})

test('filtra productos por nombre con el buscador', async ({ page }) => {
  await page.goto('/')

  // Input de busqueda por placeholder
  const searchInput = page.getByPlaceholder('Buscar por nombre...')

  await searchInput.fill('laptop')

  // Debe seguir visible la Laptop
  await expect(page.getByText('Laptop Pro X1')).toBeVisible()

})

test('abre el modal de crear producto al hacer click en "Añadir producto"', async ({
  page,
}) => {
  await page.goto('/')

  // Boton Añadir producto
  await page.getByRole('button', { name: /añadir producto/i }).click()

  // Dentro del modal debe verse el titulo del formulario
  await expect(
    page.getByText(/producto nuevo/i)
  ).toBeVisible()

})
