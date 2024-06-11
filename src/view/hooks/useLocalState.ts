import { useEffect, useState } from 'react'

function getItem<T> (key: string) {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '') as T
  } catch {
    return null
  }
}

export function useLocalState <T> (key: string) {
  const [value, setValue] = useState(getItem<T>(key))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue] as const
}
