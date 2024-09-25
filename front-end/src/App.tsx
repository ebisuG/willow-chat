import './App.css'
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { Secret } from "./pages/Secret";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (<AuthProvider>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/secret"
        element={
          <ProtectedRoute>
            <Secret />
          </ProtectedRoute>
        }
      />
    </Routes>
  </AuthProvider>)
}

export default App
