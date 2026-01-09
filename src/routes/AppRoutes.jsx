import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from '../components/auth/SignInPage';
import SignUpPage from '../components/auth/SignUpPage';
import ForgotPasswordPage from '../components/auth/ForgotPasswordPage';
import DashboardLayout from '../components/dashboard/DashboardLayout';

import NewsSection from '../components/dashboard/NewsSection';
import CreateNewsPost from '../components/dashboard/CreateNewsPost';
import EditNewsPost from '../components/dashboard/EditNewsPost';
import EventDashboard from '../components/dashboard/EventDashboard';
import UserManagement from '../components/dashboard/UserManagement';
import Enquiries from '../components/dashboard/Enquiries';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={
                <DashboardLayout>
                    <NewsSection />
                </DashboardLayout>
            } />
            <Route path="/dashboard/create" element={
                <DashboardLayout>
                    <CreateNewsPost />
                </DashboardLayout>
            } />
            <Route path="/dashboard/edit/:id" element={<EditNewsPost />} />
            <Route path="/dashboard-user" element={
                <DashboardLayout>
                    <UserManagement />
                </DashboardLayout>
            } />
            <Route path="/dashboard-enquiries" element={
                <DashboardLayout>
                    <Enquiries />
                </DashboardLayout>
            } />
            <Route path="/event-dashboard" element={
                <DashboardLayout>
                    <EventDashboard />
                </DashboardLayout>
            } />
            {/* Add more routes here as needed */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
