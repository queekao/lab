import { ReactNode } from 'react'

declare global {
  interface ChildrenProps {
    children: ReactNode
  }
}
