import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAppContext } from '@/hooks/use-app-context'
import { PopoverClose } from '@radix-ui/react-popover'

export const RemoveSummaryButton = () => {
  const { setSummary } = useAppContext()

  const handleClick = () => {
    setSummary('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='destructive'>Olvidar resumen</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex flex-col gap-2'>
          <strong className='text-sm'>¿Estás seguro de que deseas olvidar el resumen?</strong>
          <div className='flex justify-end gap-1'>
            <PopoverClose asChild>
              <Button variant='secondary'>No</Button>
            </PopoverClose>
            <Button
              variant='destructive'
              onClick={handleClick}
            >
              Sí
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
