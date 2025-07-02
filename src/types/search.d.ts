import type { Release } from '@/types/releases'
import type { Repo } from '@/types/repos'
import type { Dispatch, SetStateAction } from 'react'

export type SearchContextType = {
  repo: Repo | null
  setRepo: Dispatch<SetStateAction<Repo | null>>
  release: Release | null
  setRelease: Dispatch<SetStateAction<Release | null>>
}
