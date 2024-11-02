import React from "react";
import Navbar from "./components/shared-component/Navbar";
import Home from "./components/Home";
import RegisterPage from "./components/auth/Register";
import LoginPage from "./components/auth/Login";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/VerifyOtpAndChangePassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompanyCreate from "./components/admin/CreateCompany";
import Footer from "./components/shared-component/Footer";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import PostJob from "./components/admin/JobPost";
import Jobs from "./components/Jobs";
import Profile from "./components/Profile";
import Companies from "./components/admin/Companies";
import JobDescription from "./components/JobDescription";
import AllAdminJob from "./components/admin/allAdminJob";
import AdminJobDescription from "./components/admin/AdminJobDescription";
import CompanyUpdate from "./components/admin/CompanyUpdate"
import Applicants from "./components/admin/Applicants";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-otp-reset-password" element={<ResetPassword />} />
        <Route path="/job" element={<Jobs />} />
        <Route path="/description/:jobId" element={<JobDescription />} />
        
        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/job"
          element={
            <ProtectedRoute>
              <AllAdminJob />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/jobPost"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/companies/create"
          element={
            <ProtectedRoute>
              <CompanyCreate />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/PostJob/:companyId"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/job/description/:jobId" 
          element={
            <ProtectedRoute>
              <AdminJobDescription /> 
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/companies/:id/edit" 
          element={
            <ProtectedRoute>
              <CompanyUpdate /> 
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/:id/applicants" 
          element={
            <ProtectedRoute>
              <Applicants /> 
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
