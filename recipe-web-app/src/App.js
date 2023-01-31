import 'react-bootstrap'
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { AdminSignIn } from './components/AdminSignIn'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { UserAuthContextProvider } from './context/AuthContext'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import DisplayRecipes from './components/DisplayRecipes'

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminSignIn />} />
          <Route path="/recipes" element={<DisplayRecipes />} />
        </Routes>
      </UserAuthContextProvider>
    </>


  );
}

export default App;
