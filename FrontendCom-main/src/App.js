import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import ResetPassword from './page/ResetPassword';
import ResetPasswordToken from './page/ResetPasswordToken';
import UserPage from './page/User';
import AdminPage from './page/Admin';
import UpdatePassword from './page/UpdatePassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/request-reset-password" element={<ResetPassword />} /> {/* ใช้ :token */}
        <Route path="/reset-password/:token" element={<ResetPasswordToken />} /> {/* ใช้ :token */}

        <Route path="/user" element={<UserPage />} />
        <Route path="/Admin" element={<AdminPage />} />

        <Route path="/update-password" element={<UpdatePassword />} />



  
        <Route path="/" element={<SignIn />} /> {/* Default to SignIn */}


      </Routes>
    </Router>
  );
}

export default App;
