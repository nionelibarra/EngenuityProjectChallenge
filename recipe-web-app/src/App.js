import './App.css'
import 'react-bootstrap'
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { Routes, Route } from 'react-router-dom'
import { UserAuthContextProvider } from './context/AuthContext'

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          {/* Temporary Until theres a landing page */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </UserAuthContextProvider>
    </>


  );
}

export default App;
