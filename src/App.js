import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RootLayout from './components/RootLayout';
// import LandingPage from './components/common-pages/landing-page/LandingPage';
import SignupCategory from './components/common-pages/sigup-category/SignupCategory';
import RegistrationForm from './components/onboarding/registration/RegistrationForm';
import SignIn from './components/onboarding/login/SignIn';
import ForgotPassword from './components/onboarding/login/ForgotPassword';
import ResetPassword from './components/onboarding/login/ResetPassword';
import Dashboard from './components/dashboard/Dashboard';
import IndividualOverview from './components/dashboard/pages/overview/Overview';
import IndividualProfile from './components/dashboard/pages/profile/IndividualProfile';
import MyCourses from './components/dashboard/pages/my-courses/MyCourses';

function App() {
  return (


    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/" element={<SignupCategory />} />
          <Route path="/signup" element={<SignupCategory />} />
          <Route path="/signup/registration" element={<RegistrationForm />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} >
          <Route index element={<IndividualOverview />} />
          <Route path="/dashboard/profile" element={<IndividualProfile  />} />
          <Route path="/dashboard/mycourses" element={<MyCourses />} />
          
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
