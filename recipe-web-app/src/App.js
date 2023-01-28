import './App.css'
import 'react-bootstrap'
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { AdminSignIn } from './components/AdminSignIn'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { UserAuthContextProvider } from './context/AuthContext'

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          {/* Temporary Until theres a landing page */}
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminSignIn />} />
        </Routes>
      </UserAuthContextProvider>
    </>


  );
}

export default App;
