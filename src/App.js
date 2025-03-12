import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// import LandingPage from './components/common-pages/landing-page/LandingPage';
import SignupCategory from "./components/common-pages/sigup-category/SignupCategory";
import RegistrationForm from "./components/onboarding/registration/StudentRegistrationForm.js";
import SignIn from "./components/onboarding/login/SignIn";
import ForgotPassword from "./components/onboarding/login/ForgotPassword";
import ResetPassword from "./components/onboarding/login/ResetPassword";
import Dashboard from "./components/dashboard/Dashboard";
import IndividualOverview from "./components/dashboard/pages/overview/Overview";
import IndividualProfile from "./components/dashboard/pages/profile/IndividualProfile";
import MyCourses from "./components/dashboard/pages/my-courses/MyCourses";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OnboardingRootLayout from "./components/onboarding/OnboardingRootLayout";
import SingleCoursePage from "./components/dashboard/pages/my-courses/single-course-page/SingleCoursePage";
import ConfirmPayment from "./components/dashboard/pages/ConfirmPayment.js";
import SchoolDashboard from "./components/school-dashboard/school-pages/school-dashboard/SchoolDashboard.js";
import SchoolOverview from "./components/school-dashboard/school-pages/school-overview/SchoolOverview.js";
import SchoolSettingsChangePassword from "./components/school-dashboard/school-pages/school-settings/change-password/SchoolSettingsChangePassword.jsx";
import SchoolSettingsTeams from "./components/school-dashboard/school-pages/school-settings/teams/SchoolSettingsTeams.jsx";
import SchoolSettingsProfile from "./components/school-dashboard/school-pages/school-settings/profile/SchoolSettingsProfile.jsx";
import SchoolSettingsEmailNotifications from "./components/school-dashboard/school-pages/school-settings/email-notification/SchoolSettingsEmailNotifications.jsx";
import SchoolSettingsDeactivateAccount from "./components/school-dashboard/school-pages/school-settings/deactivate-account/SchoolSettingsDeactivateAccount.jsx";
import SchoolPaymentHistory from "./components/school-dashboard/school-pages/school-payment-history/SchoolPaymentHistory.jsx";
import SchoolSupport from "./components/school-dashboard/school-pages/school-support/SchoolSupport.jsx";
import SchoolAllCourses from "./components/school-dashboard/school-pages/school-courses/SchoolAllCourses.jsx";
import SchoolEnrolledCourseStudents from "./components/school-dashboard/school-pages/school-courses/school-enrolled-courses/school-enrolled-course-students/SchoolEnrolledCourseStudents.jsx";
import SchoolEnrolledStudents from "./components/school-dashboard/school-pages/school-courses/school-enrolled-courses/school-single-enrolled-course-page/SchoolEnrolledStudents.jsx";
import SchoolRegistrationForm from "./components/school-dashboard/school-onboarding/registration/SchoolRegistrationForm.js";
import SchoolSignIn from "./components/school-dashboard/school-onboarding/login/SchoolSignIn.js";
import SchoolForgotPassword from "./components/school-dashboard/school-onboarding/login/SchoolForgotPassword.js";
import SchoolResetPassword from "./components/school-dashboard/school-onboarding/login/SchoolResetPassword.js";
import SigninCategory from "./components/common-pages/signin-category/SigninCategory.js";
import ProtectedRoute from "./components/ProtectedRoutes.js";
import IndividualSignupCategory from "./components/common-pages/individual-signup-categorty/IndividualSignupCategory.jsx";
import StudentRegistrationForm from "./components/onboarding/registration/StudentRegistrationForm.js";
import EducatorRegistrationForm from "./components/onboarding/registration/EducatorRegistrationForm.js";
import IndividualCategory from "./components/common-pages/sigup-category/IndividualCategory.js";
import InvitedUserRegistration from "./components/onboarding/registration/InvitedStudentRegistrationForm.js";
import Support from "./components/dashboard/pages/support/Support.jsx";
import PayementHistory from "./components/dashboard/pages/payment-history/PayementHistory.jsx";
import InvitedAdminRegistration from "./components/onboarding/registration/InvitedAdminRegistration.js";
import InvitedStudentRegistrationForm from "./components/onboarding/registration/InvitedStudentRegistrationForm.js";
import SchoolEnrolledEducators from "./components/school-dashboard/school-pages/school-courses/school-enrolled-courses/school-single-enrolled-course-page/SchoolEnrolledEducators.jsx";
import SelfAwarenessCourse from "./components/dashboard/pages/my-courses/self-awareness-course/SelfAwarenessCourse.js";
import SelfAwarenessFeedback from "./components/dashboard/pages/my-courses/self-awareness-feedback/SelfAwarenessFeedback.js";
import InvitedAdminEducatorRegistration from "./components/onboarding/registration/InvitedEducatorRegistrationForm.js";
import IndividualSchoolProfile from "./components/school-dashboard/school-pages/school-courses/school-enrolled-courses/school-single-enrolled-course-page/IndividualSchoolProfile.jsx";
import SchoolSelfAwarenessFeedback from "./components/school-dashboard/school-pages/school-courses/single-individual-course-feedback/self-awareness-feedback/SchoolSelfAwarenessFeedback.js";
import CompassionCourse from "./components/dashboard/pages/my-courses/compassion-course/index.jsx";
import CompassionFeedback from "./components/dashboard/pages/my-courses/compassion-course/feedback/index.jsx";

import TransitionCourse from "./components/dashboard/pages/my-courses/transition-course/index.jsx";
import TransitionFeedback from "./components/dashboard/pages/my-courses/transition-course/feedback/index.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/*   Onboarding Routes */}

          <Route element={<OnboardingRootLayout />}>
            <Route index element={<SignIn />} />
            {/* <Route path='sign-in' element={<SigninCategory />} /> */}

            <Route path="/sign-up" element={<SignupCategory />} />
            <Route
              path="/individual/sign-up"
              element={<IndividualCategory />}
            />

            <Route
              path="/individual/sign-up/student-registration"
              element={<StudentRegistrationForm />}
            />

            <Route
              path="/invited-user"
              element={<InvitedStudentRegistrationForm />}
            />

            <Route
              path="/invited-educator"
              element={<InvitedAdminRegistration />}
            />

            <Route
              path="/invited-admin"
              element={<InvitedAdminEducatorRegistration />}
            />
            {/* <Route
              path='/individual/sign-up/educator-registration'
              element={<EducatorRegistrationForm />}
            /> */}

            <Route
              path="/individual/sign-up/educators"
              element={<EducatorRegistrationForm />}
            />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/school/sign-up/registration"
              element={<SchoolRegistrationForm />}
            />
            {/* <Route path='/school/sign-in' element={<SchoolSignIn />} /> */}
            <Route
              path="/school/forgot-password"
              element={<SchoolForgotPassword />}
            />
            <Route
              path="/school/reset-password"
              element={<SchoolResetPassword />}
            />
          </Route>

          {/*   Dashboard Routes */}
          <Route
            path="/dashboard/compassion"
            element={
              <ProtectedRoute>
                <CompassionCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/compassion/feedback"
            element={
              <ProtectedRoute>
                <CompassionFeedback />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/transition"
            element={
              <TransitionCourse />
            }
          />
          <Route
            path="/dashboard/transition/feedback"
            element={

              <TransitionCourse />

            }
          />



        </Route>


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<IndividualOverview />} />
          <Route path="/dashboard/profile" element={<IndividualProfile />} />
          <Route path="/dashboard/support" element={<Support />} />
          <Route
            path="/dashboard/feedback/self-awareness"
            element={<SelfAwarenessFeedback />}
          />
          <Route
            path="/dashboard/payment-history"
            element={<PayementHistory />}
          />
          <Route path="/dashboard/my-courses" element={<MyCourses />} />

          <Route
            path="/dashboard/self-awareness-course"
            element={<SelfAwarenessCourse />}
          />

          <Route
            path="/dashboard/enrollment/confirm"
            element={<ConfirmPayment />}
          />
        </Route>

        <Route
          path="/school-dashboard"
          element={
            <ProtectedRoute>
              <SchoolDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<SchoolOverview />} />
          <Route
            path="/school-dashboard/settings/profile"
            element={<SchoolSettingsProfile />}
          />
          <Route
            path="/school-dashboard/courses/enrolled"
            element={<SchoolEnrolledCourseStudents />}
          />
          <Route
            path="/school-dashboard/courses/enrolled/:id"
            element={<SchoolEnrolledStudents />}
          />
          <Route
            path="/school-dashboard/courses/enrolled/educators/:id"
            element={<SchoolEnrolledEducators />}
          />
          <Route
            path="/school-dashboard/courses/enrolled/:id/users/:userId"
            element={<IndividualSchoolProfile />}
          />
          <Route
            path="/school-dashboard/courses/feedback/:userId"
            element={<SchoolSelfAwarenessFeedback />}
          />

          <Route
            path="/school-dashboard/settings/teams"
            element={<SchoolSettingsTeams />}
          />
          <Route
            path="/school-dashboard/settings/change-password"
            element={<SchoolSettingsChangePassword />}
          />
          <Route
            path="/school-dashboard/settings/email-notifications"
            element={<SchoolSettingsEmailNotifications />}
          />
          <Route
            path="/school-dashboard/settings/deactivate-account"
            element={<SchoolSettingsDeactivateAccount />}
          />
          <Route path="/school-dashboard/support" element={<SchoolSupport />} />
          <Route
            path="/school-dashboard/courses/all"
            element={<SchoolAllCourses />}
          />
          <Route
            path="/school-dashboard/payment-history"
            element={<SchoolPaymentHistory />}
          />
          {/*for other users*/}
        </Route>
      </Routes>
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
}

export default App;
