import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product, productActions } from '..'

export const useProductMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: (product) => {
      console.log('Mutando - Optimistic update')
      // Optimistic Product
      const optimisticProduct = { id: Math.random(), ...product }

      // Almacenar el producto en el cache del query client
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (old) => {
          if (!old) return [optimisticProduct]
          return [...old, optimisticProduct]
        }
      )
      return { optimisticProduct }
    },
    onSuccess: (product, variables, context) => {
      console.log({ product, variables, context })

      queryClient.removeQueries({
        queryKey: ['product', context?.optimisticProduct.id]
      })
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (old) => {
          if (!old) return [product]
          return old.map((cacheProduct) => {
            return cacheProduct.id === context?.optimisticProduct.id
              ? product
              : cacheProduct
          })
        }
      )

      // invalidar queries
      // queryClient.invalidateQueries({
      //   queryKey: ['products', { filterKey: data.category }]
      // })
      // setear data sin petición
      // queryClient.setQueryData<Product[]>(
      //   ['products', { filterKey: data.category }],
      //   (old) => {
      //     if (!old) return [data]
      //     return [...old, data]
      //   }
      // )
    },
    onError: (error, variables, context) => {
      console.log({ error, variables, context })

      queryClient.removeQueries({
        queryKey: ['product', context?.optimisticProduct.id]
      })
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: variables.category }],
        (old) => {
          if (!old) return []
          return old.filter(
            (cacheProduct) => cacheProduct.id !== context?.optimisticProduct.id
          )
        }
      )

      // invalidar queries
      // queryClient.invalidateQueries({
      //   queryKey: ['products', { filterKey: data.category }]
      // })
      // setear data sin petición
      // queryClient.setQueryData<Product[]>(
      //   ['products', { filterKey: data.category }],
      //   (old) => {
      //     if (!old) return [data]
      //     return [...old, data]
      //   }
      // )
    }
  })
  return mutation
}
