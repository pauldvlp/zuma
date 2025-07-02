import type { AppContextType } from '@/types/app'
import { createContext } from 'react'

export const AppContext = createContext<AppContextType | null>(null)
