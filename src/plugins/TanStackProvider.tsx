import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export const TanstackProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  )
}
