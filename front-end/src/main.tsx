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

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider>
      <LoginPage></LoginPage>,
    </AuthProvider>
  },
  {
    path: "/chat",
    element:
      <AuthProvider>
        <ProtectedRoute>
          <Secret />
        </ProtectedRoute>,
      </AuthProvider>
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
        <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>,
)
