import { SearchContext } from '@/components/app/search-context'
import { useContext } from 'react'

export const useSearch = () => {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }

  return context
}
