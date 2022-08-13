import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Auth from '../hoc/auth';

import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import UploadProductPage from './views/UploadProductPage/UploadProductPage';

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthUploadProductPage = Auth(UploadProductPage, true);
  
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
        <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
          <Routes>
            <Route path="/" element = {<AuthLandingPage/>} />
            <Route path="/login" element = {<AuthLoginPage/>} />
            <Route path="/register" element = {<AuthRegisterPage/>} />
            <Route path="/product/upload" element = {<AuthUploadProductPage/>} />
          </Routes>
        </div>
        <Footer />
    </Suspense>
  );
}

export default App;