import './App.css'
import Chat from './Chat'
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
// import { HomePage } from "./pages/Home";
import { Secret } from "./pages/Secret";
import { useRoutes } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  // const routes = useRoutes([
  //   { path: "/", element: <LoginPage></LoginPage> },
  //   { path: "/login", element: <LoginPage></LoginPage> },
  //   { path: "/chat", element: <Chat></Chat> },
  //   {
  //     path: "/secret", element:
  //       <ProtectedRoute >
  //         <Secret />
  //       </ProtectedRoute >
  //   }
  // ])


  return (<AuthProvider>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
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
