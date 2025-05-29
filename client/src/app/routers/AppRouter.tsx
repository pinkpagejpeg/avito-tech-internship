import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { publicRoutes } from './routes'

export const AppRouter = () => {
  const router = createBrowserRouter(publicRoutes, {
    basename: '/',
  });

  return <RouterProvider router={router} />
}