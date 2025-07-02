import type { SearchContextType } from '@/types/search'
import { createContext } from 'react'

export const SearchContext = createContext<SearchContextType | null>(null)
