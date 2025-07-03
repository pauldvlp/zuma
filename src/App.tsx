import { AppProvider } from '@/components/app/app-provider'
import { Footer } from '@/components/app/footer'
import { Header } from '@/components/app/header'
import { SearchContainerSkeleton } from '@/components/app/search-container-skeleton'
import { SummaryViewer } from '@/components/app/summary-viewer'
import { Toaster } from '@/components/ui/sonner'
import { lazy, Suspense } from 'react'

async function delayForDemo<T = unknown>(promise: Promise<T>) {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
  return await promise
}

const SearchContainer = lazy(() => delayForDemo(import('./components/app/search-container')))

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
          <Suspense fallback={<SearchContainerSkeleton />}>
            <SearchContainer />
          </Suspense>
        </section>
      </main>
      <SummaryViewer />
      <Footer />
      <Toaster richColors />
    </AppProvider>
  )
}
