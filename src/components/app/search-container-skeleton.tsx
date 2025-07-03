import { Skeleton } from '@/components/ui/skeleton'

export const SearchContainerSkeleton = () => {
  return (
    <>
      <Skeleton className='md:col-span-3 h-12' />
      <Skeleton className='h-12 md:col-span-2' />
      <Skeleton className='h-12 md:col-span-5' />
    </>
  )
}
