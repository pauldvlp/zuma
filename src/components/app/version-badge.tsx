import { Badge } from '@/components/ui/badge'

export const VersionBadge = () => {
  return (
    <Badge variant='secondary'>{__APP_VERSION__}</Badge>
  )
}
