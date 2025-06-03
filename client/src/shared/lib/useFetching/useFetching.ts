import { useCallback, useState } from 'react'

/**
 * Кастомный хук обертка для выполнения асинхронного запроса с обработкой загрузки и ошибок
 *
 * @param callback - асинхронная функция, которую нужно вызвать для выполнения запроса на сервер
 * @returns [fetching, isLoading, error]:
 *  - fetching — обертка над исходной функцией
 *  - isLoading — состояние загрузки
 *  - error — сообщение об ошибке
 */
export function useFetching<Args extends unknown[]>(
  callback: (...args: Args) => Promise<void>
): [
  (...args: Args) => Promise<void>, // функция обертка для вызова запроса
  boolean,                          // индикатор загрузки
  string                            // текст ошибки
] {
  const [isLoading, setIsLoading] = useState(false) // состояние загрузки
  const [error, setError] = useState('')            // состояние ошибки

  const fetching = useCallback(async (...args: Args): Promise<void> => {
    try {
      // При выполнении запроса на сервер включается индикатор загрузки
      // и вызывается переданная асинхронная функция с запросом
      setIsLoading(true)
      await callback(...args)
    } catch (error) {
      // При возникновении ошибки сохраняется сообщение об ошибке
      setError(error instanceof Error ? error.message : String(error))
    } finally {
      // Вне зависимости от успешности выполнения запроса индикатор загрузки выключается
      setIsLoading(false)
    }
  }, [callback])

  return [fetching, isLoading, error]
}
