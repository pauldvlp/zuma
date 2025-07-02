import { GitHub } from '@/components/icons/github'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export const Header = () => {
  return (
    <div className='px-4 md:px-8 sticky top-0 bg-gradient-to-b from-background via-background via-80% to-transparent z-10'>
      <header className='max-w-5xl mx-auto h-20 flex items-center justify-between'>
        <h2 className='text-lg font-semibold flex gap-1 items-center'>
          Zuma
          <Badge variant='secondary'>Beta</Badge>
        </h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              className='transition-transform duration-300 hover:scale-105'
              href='https://github.com/pauldvlp/zuma'
              title='Github'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GitHub className='size-6' />
            </a>
          </TooltipTrigger>
          <TooltipContent
            side='left'
            align='center'
          >
            Dame una ⭐ en GitHub
          </TooltipContent>
        </Tooltip>
      </header>
    </div>
  )
}
