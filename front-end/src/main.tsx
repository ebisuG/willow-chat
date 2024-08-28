import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Secret } from './pages/Secret';
import { AuthProvider } from './hooks/useAuth';
import { RegisterPage } from './pages/RegisterPage';
import { GeneralErrorPage } from './pages/GeneralErrorPpage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider>
      <LoginPage></LoginPage>,
    </AuthProvider>,
    errorElement: <GeneralErrorPage />
  },
  {
    path: "/register",
    element: <AuthProvider>
      <RegisterPage></RegisterPage>,
    </AuthProvider>,
    errorElement: <GeneralErrorPage />
  },
  {
    path: "/chat",
    element:
      <AuthProvider>
        <ProtectedRoute>
          <Secret />
        </ProtectedRoute>
      </AuthProvider>,
    errorElement: <GeneralErrorPage />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>,
)
