import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createTheme, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateLayout } from './Layouts/PrivateLayout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <App />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router}/>
    </MantineProvider>
  </StrictMode>,
)
