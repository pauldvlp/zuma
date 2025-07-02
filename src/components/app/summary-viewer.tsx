import { RemoveSummaryButton } from '@/components/app/remove-summary-button'
import { useAppContext } from '@/hooks/use-app-context'
import { cn } from '@/lib/utils'
import 'highlight.js/styles/atom-one-dark.min.css'
import { useEffect } from 'react'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

export const SummaryViewer = () => {
  const { summary } = useAppContext()

  useEffect(() => {
    if (summary) {
      const summarySection = document.getElementById('summary-viewer')
      summarySection?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [summary])

  return summary
    ? (
        <section
          id='summary-viewer'
          className={cn('max-w-[65ch] mx-auto min-h-screen space-y-4 scroll-m-16', summary ? 'p-4 md:p-8' : 'hidden')}
        >
          <div className='prose dark:prose-invert prose-code:before:content-[""] prose-code:after:content-[""] prose-code:bg-muted prose-code:p-1 prose-code:rounded'>
            <Markdown rehypePlugins={[rehypeHighlight]}>{summary}</Markdown>
          </div>
          <footer className='text-end'>
            <RemoveSummaryButton />
          </footer>
        </section>
      )
    : null
}
