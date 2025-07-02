import { AppContext } from '@/components/app/app-context'
import { useState, type Dispatch, type FC, type PropsWithChildren, type SetStateAction } from 'react'

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [summary, setSummary] = useState<string | null>(() => {
    return localStorage.getItem('zuma-stored-summary')
  })

  const saveSummary: Dispatch<SetStateAction<string | null>> = (setStateAction) => {
    const newSummary = typeof setStateAction === 'function' ? setStateAction(summary) : setStateAction
    setSummary(newSummary)
    localStorage.setItem('zuma-stored-summary', newSummary ?? '')
  }

  return (
    <AppContext.Provider value={{ summary, setSummary: saveSummary }}>{children}</AppContext.Provider>
  )
}
