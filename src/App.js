import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

// import LandingPage from './components/common-pages/landing-page/LandingPage';
import SignupCategory from './components/common-pages/sigup-category/SignupCategory'
import RegistrationForm from './components/onboarding/registration/RegistrationForm'
import SignIn from './components/onboarding/login/SignIn'
import ForgotPassword from './components/onboarding/login/ForgotPassword'
import ResetPassword from './components/onboarding/login/ResetPassword'
import Dashboard from './components/dashboard/Dashboard'
import IndividualOverview from './components/dashboard/pages/overview/Overview'
import IndividualProfile from './components/dashboard/pages/profile/IndividualProfile'
import MyCourses from './components/dashboard/pages/my-courses/MyCourses'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import OnboardingRootLayout from './components/onboarding/OnboardingRootLayout'
import SingleCoursePage from './components/dashboard/pages/my-courses/single-course-page/SingleCoursePage'
import ConfirmPayment from './components/dashboard/pages/ConfirmPayment.js'
import SchoolDashboard from './components/school-dashboard/school-pages/school-dashboard/SchoolDashboard.js'
import SchoolOverview from './components/school-dashboard/school-pages/school-overview/SchoolOverview.js'
import SchoolSettingsChangePassword from './components/school-dashboard/school-pages/school-settings/change-password/SchoolSettingsChangePassword.jsx'
import SchoolSettingsTeams from './components/school-dashboard/school-pages/school-settings/teams/SchoolSettingsTeams.jsx'
import SchoolSettingsProfile from './components/school-dashboard/school-pages/school-settings/profile/SchoolSettingsProfile.jsx'
import SchoolSettingsEmailNotifications from './components/school-dashboard/school-pages/school-settings/email-notification/SchoolSettingsEmailNotifications.jsx'
import SchoolSettingsDeactivateAccount from './components/school-dashboard/school-pages/school-settings/deactivate-account/SchoolSettingsDeactivateAccount.jsx'
import SchoolPaymentHistory from './components/school-dashboard/school-pages/school-payment-history/SchoolPaymentHistory.jsx'
import SchoolSupport from './components/school-dashboard/school-pages/school-support/SchoolSupport.jsx'
import SchoolAllCourses from './components/school-dashboard/school-pages/school-courses/SchoolAllCourses.jsx'
import SchoolEnrolledCourseStudents from './components/school-dashboard/school-pages/school-courses/school-enrolled-courses/school-enrolled-course-students/SchoolEnrolledCourseStudents.jsx'
import SchoolEnrolledStudents from './components/school-dashboard/school-pages/school-courses/school-enrolled-courses/school-single-enrolled-course-page/SchoolEnrolledStudents.jsx'
import SchoolRegistrationForm from './components/school-dashboard/school-onboarding/registration/SchoolRegistrationForm.js'
import SchoolSignIn from './components/school-dashboard/school-onboarding/login/SchoolSignIn.js'
import SchoolForgotPassword from './components/school-dashboard/school-onboarding/login/SchoolForgotPassword.js'
import SchoolResetPassword from './components/school-dashboard/school-onboarding/login/ResetPassword.js'
import SigninCategory from './components/common-pages/signin-category/SignupCategory.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          {/*   Onboarding Routes */}

          <Route element={<OnboardingRootLayout />}>
            <Route path='/' element={<SignupCategory />} />
            <Route path='/sign-in' element={<SigninCategory />} />
            <Route path='/sign-up/registration' element={<RegistrationForm />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route
              path='/dashboard/signup/registration'
              element={<SchoolRegistrationForm />}
            />
            <Route path='/dashboard/sign-in' element={<SchoolSignIn />} />
            <Route
              path='/dashboard/forgot-password'
              element={<SchoolForgotPassword />}
            />
            <Route
              path='/dashboard/reset-password'
              element={<SchoolResetPassword />}
            />
          </Route>

          {/*   Dashboard Routes */}
          <Route path='/dashboard' element={<Dashboard />}>
            <Route index element={<IndividualOverview />} />
            <Route path='/dashboard/profile' element={<IndividualProfile />} />
            <Route path='/dashboard/my-courses' element={<MyCourses />} />
            <Route
              path='/dashboard/my-courses/:id'
              element={<SingleCoursePage />}
            />

            <Route
              path='/dashboard/enrollment/confirm'
              element={<ConfirmPayment />}
            />
          </Route>
        </Route>

        <Route path='/school-dashboard' element={<SchoolDashboard />}>
          <Route index element={<SchoolOverview />} />
          <Route
            path='/school-dashboard/settings/profile'
            element={<SchoolSettingsProfile />}
          />
          <Route
            path='/school-dashboard/courses/enrolled'
            element={<SchoolEnrolledCourseStudents />}
          />
          <Route
            path='/school-dashboard/courses/enrolled/:id'
            element={<SchoolEnrolledStudents />}
          />
          <Route
            path='/school-dashboard/settings/teams'
            element={<SchoolSettingsTeams />}
          />
          <Route
            path='/school-dashboard/settings/change-password'
            element={<SchoolSettingsChangePassword />}
          />
          <Route
            path='/school-dashboard/settings/email-notifications'
            element={<SchoolSettingsEmailNotifications />}
          />
          <Route
            path='/school-dashboard/settings/deactivate-account'
            element={<SchoolSettingsDeactivateAccount />}
          />
          <Route path='/school-dashboard/support' element={<SchoolSupport />} />
          <Route
            path='/school-dashboard/courses/all'
            element={<SchoolAllCourses />}
          />
          <Route
            path='/school-dashboard/payment-history'
            element={<SchoolPaymentHistory />}
          />
        </Route>
      </Routes>
      <ToastContainer position='top-right' />
    </BrowserRouter>
  )
}

export default App
