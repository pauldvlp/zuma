import { ReleaseDate } from '@/components/app/release-date'
import { Button, type ButtonProps } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearch } from '@/hooks/use-search'
import { onRepoSelected } from '@/lib/events'
import { cn } from '@/lib/utils'
import type { Release } from '@/types/releases'
import { PopoverClose } from '@radix-ui/react-popover'
import { useEffect, useState, type FC } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import useFetch from 'use-http'

export const SearchReleases: FC<ButtonProps> = (props) => {
  const [releases, setReleases] = useState<Release[]>([])
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)

  const { repo, release: selectedRelease, setRelease } = useSearch()
  const { get, response, error, loading } = useFetch('https://api.github.com/repos')

  const searchReleases = useDebouncedCallback(async (full_name: string, page: number) => {
    const releases = await get(`/${full_name}/releases?per_page=5&page=${page}`)
    if (response.ok) setReleases(releases || [])
  }, 300)

  const handleClear = () => {
    setReleases([])
  }

  const handlePageChange = (number: number) => {
    setPage(prevValue => Math.sign(number) === -1 ? Math.max(prevValue - 1, 1) : prevValue + 1)
  }

  useEffect(() => {
    setPage(1)
  }, [repo])

  useEffect(() => {
    if (!repo) {
      handleClear()
    }
    else {
      setRelease(null)
      searchReleases(repo.full_name, page)
    }
  }, [repo, page, searchReleases, setRelease])

  useEffect(() => {
    onRepoSelected.subscribe(() => setOpen(true))
  }, [])

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger
        {...props}
        asChild
      >
        <Button
          variant='outline'
          role='combobox'
          className='justify-between'
          disabled={!repo}
        >
          {
            selectedRelease
              ? (
                  <span className='truncate'>{selectedRelease.tag_name}</span>
                )
              : (
                  <span className='text-muted-foreground'>Selecciona una release</span>
                )
          }
          <Icon name='bookmark-02' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='p-0'
        align='center'
      >
        <section className={cn('p-2 pb-0 max-h-64 overflow-y-auto overflow-x-hidden', error ? 'text-red-500' : 'text-muted-foreground')}>
          {
            loading
              ? (
                  <div className='space-y-1'>
                    <Skeleton className='h-8 w-full' />
                    <Skeleton className='h-8 w-full' />
                    <Skeleton className='h-8 w-full' />
                    <Skeleton className='h-8 w-full' />
                    <Skeleton className='h-8 w-full' />
                  </div>
                )
              : error
                ? (
                    <p className='text-center text-red-500'>{error.message}</p>
                  )
                : releases.length
                  ? (
                      <ul className='grid'>
                        {releases.map(release => (
                          <PopoverClose key={release.id}>
                            <li
                              className='px-2 py-1.5 hover:bg-muted hover:text-foreground rounded cursor-pointer flex items-center gap-2 justify-start text-start'
                              title={release.tag_name}
                              onClick={() => setRelease(release)}
                            >
                              {selectedRelease && selectedRelease.id === release.id && (
                                <Icon name='tick-02' />
                              )}
                              <span>
                                {release.tag_name}
                              </span>
                              <ReleaseDate>{release.published_at}</ReleaseDate>
                            </li>
                          </PopoverClose>
                        ))}
                      </ul>
                    )
                  : (
                      <p className='text-center pb-2'>No se encontraron releases</p>
                    )
          }
        </section>
        {releases.length > 0 && (
          <footer className='flex justify-end gap-1 p-2'>
            <Button
              variant='outline'
              size='icon'
              disabled={page <= 1}
              onClick={() => handlePageChange(-1)}
            >
              <Icon name='arrow-left-02' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              disabled
            >
              {page}
            </Button>
            <Button
              variant='outline'
              size='icon'
              disabled={releases.length < 5}
              onClick={() => handlePageChange(1)}
            >
              <Icon name='arrow-right-02' />
            </Button>
          </footer>
        )}
      </PopoverContent>
    </Popover>
  )
}
