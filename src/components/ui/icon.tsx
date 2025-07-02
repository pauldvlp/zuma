import { cn } from '@/lib/utils'
import type { IconProps } from '@/types/hugeicons'
import type { FC } from 'react'

export const Icon: FC<IconProps> = ({ name, className = '', size = 'inherit', ...props }) => {
  const fontSize = typeof size === 'number' ? `${size}px` : size
  return (
    <i
      className={cn(`hgi-stroke hgi-${name} font-[Hugeicons_Rounded_Stroke]`, className)}
      style={{ fontSize }}
      {...props}
    >
    </i>
  )
}
