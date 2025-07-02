import type { Dispatch, SetStateAction } from 'react'

export type AppContextType = {
  summary: string | null
  setSummary: Dispatch<SetStateAction<string | null>>
}
