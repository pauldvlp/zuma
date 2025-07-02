import { Button, type ButtonProps } from '@/components/ui/button'
import { useAppContext } from '@/hooks/use-app-context'
import { useSearch } from '@/hooks/use-search'
import { generateSummary } from '@/lib/google-genai'
import { useState, type FC } from 'react'
import { toast } from 'sonner'

export const GenerateSummaryButton: FC<ButtonProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const { repo, release } = useSearch()
  const { setSummary } = useAppContext()

  const abortController = new AbortController()

  const handleClick = async () => {
    if (!repo || !release) return

    try {
      toast.promise(
        () => {
          setLoading(true)
          return generateSummary(repo, release, abortController.signal)
        },
        {
          loading: 'Generando resumen...',
          success: ({ error, markdown }) => {
            if (error) {
              const id = toast('Lo sentimos, no se pudo generar el resumen.', {
                description: <span className='italic'>{`Error: ${error}`}</span>,
                action: { label: 'Reintentar', onClick: handleClick },
                cancel: { label: 'Ok', onClick: () => toast.dismiss(id) }
              })
            }

            if (markdown) {
              setSummary(markdown)
            }

            return 'Resumen generado exitosamente.'
          },
          action: {
            label: 'Cancelar',
            onClick: () => {
              abortController.abort()
            }
          }
        }
      )
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Button
      {...props}
      disabled={!repo || !release || loading}
      onClick={() => handleClick()}
    >
      {
        loading ? <span className='size-4 border-2 border-foreground border-t-transparent rounded-full animate-spin' /> : 'Generar resumen'
      }
    </Button>
  )
}
