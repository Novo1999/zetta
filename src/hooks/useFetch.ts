'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useFetch<T>(endpoint: string, opts?: { simulateError?: boolean }) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  const fetchData = useCallback(
    async (forceUrl?: string) => {
      setLoading(true)
      setError(null)
      controllerRef.current?.abort()
      const co = new AbortController()
      controllerRef.current = co
      try {
        const url = forceUrl ?? endpoint
        const res = await fetch(url, { signal: co.signal })
        if (!res.ok) {
          throw new Error(`API responded with status ${res.status}`)
        }
        const json = await res.json()
        setData(json)
        setLoading(false)
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }

        setError(getErrorMessage(err))
        setLoading(false)
      }
    },
    [endpoint]
  )

  useEffect(() => {
    const target = opts?.simulateError ? endpoint + '/invalid' : endpoint
    fetchData(target)
    return () => {
      controllerRef.current?.abort()
    }
  }, [endpoint, fetchData, opts?.simulateError])

  return {
    data,
    loading,
    error,
    refetch: (forceUrl?: string) => fetchData(forceUrl),
  }
}
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'Unknown error'
}
