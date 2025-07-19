import { Button, type ButtonProps } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearch } from '@/hooks/use-search'
import { onRepoSelected } from '@/lib/events'
import { cn } from '@/lib/utils'
import type { Repo } from '@/types/repos'
import { PopoverClose } from '@radix-ui/react-popover'
import { useState, type ChangeEventHandler, type FC } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import useFetch from 'use-http'

import { throw_error_by_status_code, type HttpStatusCode, type ExpectedError, isSentinelError } from 'http-sentinel'
import { ErrorContainer } from '@/components/app/error-container'

export const SearchRepos: FC<ButtonProps> = (props) => {
  const [repos, setRepos] = useState<Repo[]>([])
  const [query, setQuery] = useState('')
  const [error, setError] = useState<null | ExpectedError>(null)

  const { repo, setRepo } = useSearch()
  const { get, response, loading } = useFetch('https://api.github.com/search')

  const handleRepoClick = (repo: Repo) => {
    setRepo(repo)
    onRepoSelected.next(repo)
  }

  const searchRepos = useDebouncedCallback(async (query: string) => {
    try {
      const repos = await get(`/repositories?q=${encodeURIComponent(query)}&per_page=5`)
      if (response.status !== 200) throw_error_by_status_code(response.status as HttpStatusCode)
      if (error) setError(null)
      setRepos(repos.items || [])
    }
    catch (error) {
      if (isSentinelError(error)) setError(error)
    }
  }, 300)

  const handleClear = () => {
    setRepos([])
    setQuery('')
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value
    setQuery(value)

    if (!value.trim()) {
      return
    }

    searchRepos(value)
  }

  return (
    <Popover>
      <PopoverTrigger
        {...props}
        asChild
      >
        <Button
          variant='outline'
          role='combobox'
          className='justify-between'
        >
          {
            repo
              ? (
                  <div className='flex gap-2 items-center'>
                    <img
                      src={repo.owner.avatar_url}
                      className='size-6 object-cover rounded-full'
                    />
                    {repo.full_name}
                  </div>
                )
              : (
                  <span className='text-muted-foreground'>Busca un repositorio</span>
                )
          }
          <Icon name='book-04' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='p-0 min-w-[calc(100vw_-_2rem)] md:min-w-sm'
        align='center'
      >
        <header className='h-12 flex items-center justify-between gap-2 px-4 border-b'>
          <Icon name='search-01' />
          <input
            className='outline-none grow'
            placeholder='Buscar un repositorio'
            value={query}
            onChange={handleChange}
          />
          {query && (
            <Icon
              name='cancel-01'
              onClick={handleClear}
            />
          )}
        </header>
        <section className={cn('p-2 max-h-64 overflow-y-auto', error ? 'text-red-500' : 'text-muted-foreground')}>
          {
            loading
              ? (
                  <div className='space-y-1'>
                    <Skeleton className='h-6 w-full' />
                    <Skeleton className='h-6 w-full' />
                    <Skeleton className='h-6 w-full' />
                  </div>
                )
              : error
                ? (
                    <ErrorContainer error={error} />
                  )
                : repos.length === 0
                  ? (
                      <p className='text-center text-sm py-4'>{query ? 'No se encontraron repositorios.' : 'Por favor ingresa un término de búsqueda.'}</p>
                    )
                  : (
                      <ul className='grid'>
                        {repos.map(repo => (
                          <PopoverClose key={repo.id}>
                            <li
                              className='px-2 py-1.5 hover:bg-muted hover:text-foreground rounded cursor-pointer flex items-center gap-2'
                              onClick={() => handleRepoClick(repo)}
                            >
                              <img
                                src={repo.owner.avatar_url}
                                className='size-6 object-cover rounded-full'
                              />
                              {repo.full_name}
                            </li>
                          </PopoverClose>
                        ))}
                      </ul>
                    )
          }
        </section>
      </PopoverContent>
    </Popover>
  )
}
