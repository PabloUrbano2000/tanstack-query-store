import { productsApi } from '../api/productsApi'
import { type Product } from '../interfaces/product'

interface GetProductsOptions {
  filterKey?: string
}

export const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  const filterUrl = filterKey ? `?category=${filterKey}` : ''
  const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`)
  return data
}

export const getProductById = async (id: number) => {
  const { data } = await productsApi.get<Product>(`/products/${id}`)
  return data
}

interface ProductLike {
  id?: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export const createProduct = async (product: ProductLike) => {
  await sleep(5)
  throw new Error('Error creando producto')
  const { data } = await productsApi.post<Product>(`/products`, product)
  return data
}
