import 'react-bootstrap'
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { UserAuthContextProvider } from './context/AuthContext'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { AdminDashboard } from './pages/AdminDashboard'
import { AdminSignIn } from './components/AdminSignIn'


//the React router-dom  import serves as the "API" 
//that manages the 'routes' through the whole web application
function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminSignIn />} />
          <Route path="/admindashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </UserAuthContextProvider>
    </>


  );
}

export default App;
