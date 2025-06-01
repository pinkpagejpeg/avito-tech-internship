import { useState } from 'react'

export function useFetching<Args extends any[] = any[]>(
  callback: (...args: Args) => Promise<void>
): [
  (...args: Args) => Promise<void>,
  boolean,
  string
] {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetching = async (...args: Args): Promise<void> => {
    try {
      setIsLoading(true)
      await callback(...args)
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error))
    } finally {
      setIsLoading(false)
    }
  }

  return [fetching, isLoading, error]
}
