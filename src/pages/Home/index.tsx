import { Icon } from '@iconify/react'
import type { FC } from 'react'

export const Home: FC = () => {
  return (
    <div className="w-[300px] h-[200px] m-auto text-3xl flex flex-col items-center">
      <Icon icon="mdi:home" width="48" height="48" color="red" />
      <p>Home</p>
    </div>
  )
}
