import { SearchContext } from '@/components/app/search-context'
import type { Release } from '@/types/releases'
import type { Repo } from '@/types/repos'
import { useState, type FC, type PropsWithChildren } from 'react'

export const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [repo, setRepo] = useState<Repo | null>(null)
  const [release, setRelease] = useState<Release | null>(null)

  return (
    <SearchContext.Provider value={{ repo, setRepo, release, setRelease }}>{children}</SearchContext.Provider>
  )
}
