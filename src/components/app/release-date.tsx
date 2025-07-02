import { type FC } from 'react'

const formatter = (date: string) => new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(date))

export const ReleaseDate: FC<{ children: string }> = ({ children }) => {
  return (
    <span className='text-xs px-1 rounded-sm bg-muted text-muted-foreground shrink-0'>{formatter(children)}</span>
  )
}
