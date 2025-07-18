import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Home from './pages/Home/Home.tsx'
import Shop from './pages/Shop/Shop.tsx'
import Cart from './pages/Cart/Cart.tsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
      index: true,
      element: <Home/>,
      },
      {
      path: "shop",
      element: <Shop/>,
      },
      {
      path: "cart",
      element: <Cart/>,
      },
    ]
  },
])



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
