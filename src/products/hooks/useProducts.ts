import { useQuery } from '@tanstack/react-query'
import { Product, productActions } from '..'

interface Options {
  filterKey?: string
}

export const useProducts = ({ filterKey }: Options) => {
  const {
    isLoading,
    isError,
    error,
    data: products = [],
    isFetching
  } = useQuery<Product[]>({
    queryKey: ['products', { filterKey }],
    queryFn: () => productActions.getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60
  })

  return {
    isLoading,
    isError,
    error,
    products,
    isFetching
  }
}
