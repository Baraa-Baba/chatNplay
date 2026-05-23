import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import App from './App';
import Credits from './Components/credits/credits';
import SignIn from './Components/signUp/signUp';
import Dashboard from './Components/Dashboard/Dashboard';
import Protected from './Components/Protected/Protected';
import { ToastProvider } from './Components/Toast/Toast';

function Main() {
  return (
    <ToastProvider>
      <Router>
        <Routes> 
          <Route path="/" element={<App />} />
          <Route path="/Credits" element={<Credits />} />
          <Route path="/signUp" element={<SignIn />} />
          <Route path="/dashboard" element={
            <Protected >
          <Dashboard />
          </Protected>
          } />
        </Routes>
      </Router>
    </ToastProvider>
  )
}

export default Main