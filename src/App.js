import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

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

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import OnboardingRootLayout from './components/onboarding/OnboardingRootLayout';
// import SingleCoursePage from './components/dashboard/pages/my-courses/single-course-page/SingleCoursePage';
function App() {
  return (


    <BrowserRouter>
      <Routes>
        <Route path='/'>

          {/*   Onboarding Routes */}

          <Route element={<OnboardingRootLayout />}>
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/" element={<SignupCategory />} />
            <Route path="/signup" element={<SignupCategory />} />
            <Route path="/signup/registration" element={<RegistrationForm />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/*   Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} >
            <Route index element={<IndividualOverview />} />
            <Route path="/dashboard/profile" element={<IndividualProfile />} />
            <Route path="/dashboard/my-courses" element={<MyCourses />} />
            {/* <Route path="/dashboard/my-courses/:id" element={<SingleCoursePage />} /> */}
          </Route>
        </Route>

      </Routes>
      <ToastContainer position='top-right' />
    </BrowserRouter>
  );
}

export default App;
