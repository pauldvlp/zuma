import { GenerateSummaryButton } from '@/components/app/generate-summary-button'
import { SearchProvider } from '@/components/app/search-provider'
import { SearchReleases } from '@/components/app/search-releases'
import { SearchRepos } from '@/components/app/search-repos'

const SearchContainer = () => {
  return (
    <SearchProvider>
      <SearchRepos className='md:col-span-3 h-12 md:text-base' />
      <SearchReleases className='h-12 md:col-span-2 md:text-base' />
      <GenerateSummaryButton
        className='h-12 md:text-base md:col-span-5'
        variant='outline'
      />
    </SearchProvider>
  )
}

export default SearchContainer
