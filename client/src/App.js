import React, { Suspense } from 'react';
import {
  Routes, 
  Route, 
  BrowserRouter
} from 'react-router-dom';

import Auth from './hoc/auth';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import UploadProductPage from './components/views/UploadProductPage/UploadProductPage';

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthUploadProductPage = Auth(UploadProductPage, true);
  
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
        <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element = {<AuthLandingPage/>} />
              <Route path="/login" element = {<AuthLoginPage/>} />
              <Route path="/register" element = {<AuthRegisterPage/>} />
              <Route path="/product/upload" element = {<AuthUploadProductPage/>} />
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
    </Suspense>
  );
}

export default App;