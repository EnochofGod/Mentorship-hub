import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Common/LoginPage';
import RegisterPage from './pages/Common/RegisterPage';
import ProfileEditPage from './pages/Common/ProfileEditPage';
import ProfilePage from './pages/Common/ProfilePage';
import ForgotPasswordPage from './pages/Common/ForgotPasswordPage';
import ResetPasswordPage from './pages/Common/ResetPasswordPage';
import HomePage from './pages/Common/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import HealthCheckPage from './pages/HealthCheckPage';
// Admin
import UsersPage from './pages/Admin/UsersPage';
import MatchesPage from './pages/Admin/MatchesPage';
import AdminSessionsPage from './pages/Admin/SessionsPage';
// Mentor
import MentorDashboardPage from './pages/Mentor/DashboardPage';
import AvailabilityPage from './pages/Mentor/AvailabilityPage';
import MentorRequestsPage from './pages/Mentor/RequestsPage';
import MentorSessionsPage from './pages/Mentor/SessionsPage';
// Mentee
import MenteeDashboardPage from './pages/Mentee/DashboardPage';
import MySessionsPage from './pages/Mentee/MySessionsPage';
import MenteeRequestsPage from './pages/Mentee/RequestsPage';
import MenteeSessionsPage from './pages/Mentee/SessionsPage';
// Mentors Directory
import MentorsPage from './pages/Common/MentorsPage';
import Header from './components/common/Header';
import BookSessionPage from './pages/Mentee/BookSessionPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Common */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        {/* Admin */}
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/matches" element={<MatchesPage />} />
        <Route path="/admin/sessions" element={<AdminSessionsPage />} />
        {/* Mentor */}
        <Route path="/mentor" element={<Navigate to="/mentor/dashboard" replace />} />
        <Route path="/mentor/dashboard" element={<MentorDashboardPage />} />
        <Route path="/mentor/availability" element={<AvailabilityPage />} />
        <Route path="/mentor/requests" element={<MentorRequestsPage />} />
        <Route path="/mentor/sessions" element={<MentorSessionsPage />} />
        {/* Mentee */}
        <Route path="/mentee/dashboard" element={<MenteeDashboardPage />} />
        <Route path="/mentee/my-sessions" element={<MySessionsPage />} />
        <Route path="/mentee/my-requests" element={<MenteeRequestsPage />} />
        <Route path="/mentee/sessions" element={<MenteeSessionsPage />} />
        {/* Mentors Directory */}
        <Route path="/mentors" element={<MentorsPage />} />
        <Route path="/mentors/:mentorId/book" element={<BookSessionPage />} />
        {/* Health Check */}
        <Route path="/health" element={<HealthCheckPage />} />
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
