import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { publicRoutes } from './routes'

// Компонент для настройки маршрутизации с помощью React Router
export const AppRouter = () => {
  // Создание экземпляра маршрутизатора на основе маршрутов publicRoutes
  const router = createBrowserRouter(publicRoutes, {
    basename: '/',
  });

  return <RouterProvider router={router} />
}