import 'react-bootstrap'
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { AdminSignIn } from './components/AdminSignIn'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { UserAuthContextProvider } from './context/AuthContext'
import { Home } from './pages/Dashboard'

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          {/* Temporary Until theres a landing page */}
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminSignIn />} />
        </Routes>
      </UserAuthContextProvider>
    </>


  );
}

export default App;
