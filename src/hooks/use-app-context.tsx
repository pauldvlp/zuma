import { AppContext } from '@/components/app/app-context'
import { useContext } from 'react'

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }

  return context
}
