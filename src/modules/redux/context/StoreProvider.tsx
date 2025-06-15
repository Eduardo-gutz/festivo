'use client'

import { makeStore } from '@/modules/redux/store'
import { AppStore } from '@/modules/redux/types/redux.types'
import { useRef } from 'react'
import { Provider } from 'react-redux'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
} 