import { AppProvider } from '@/components/app/app-provider'
import { Footer } from '@/components/app/footer'
import { GenerateSummaryButton } from '@/components/app/generate-summary-button'
import { Header } from '@/components/app/header'
import { SearchProvider } from '@/components/app/search-provider'
import { SearchReleases } from '@/components/app/search-releases'
import { SearchRepos } from '@/components/app/search-repos'
import { SummaryViewer } from '@/components/app/summary-viewer'
import { Toaster } from '@/components/ui/sonner'

export const App = () => {
  return (
    <AppProvider>
      <Header />
      <main className='min-h-[calc(100dvh_-_5rem)] flex flex-col justify-center items-center gap-4 p-4 md:p-8'>
        <section className='text-center space-y-2'>
          <h1 className='font-bold text-3xl md:text-4xl'>Zuma</h1>
          <p className='max-w-[65ch]'>Genera resúmenes de las releases de repositorios de GitHub con IA.</p>
        </section>
        <section className='grid md:grid-cols-5 gap-2 w-full max-w-3xl'>
          <SearchProvider>
            <SearchRepos className='md:col-span-3 h-12 md:text-base' />
            <SearchReleases className='h-12 md:col-span-2 md:text-base' />
            <GenerateSummaryButton
              className='h-12 md:text-base md:col-span-5'
              variant='outline'
            />
          </SearchProvider>
        </section>
      </main>
      <SummaryViewer />
      <Footer />
      <Toaster richColors />
    </AppProvider>
  )
}
