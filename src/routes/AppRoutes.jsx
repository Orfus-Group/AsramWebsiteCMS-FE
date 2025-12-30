import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from '../components/auth/SignInPage';
import SignUpPage from '../components/auth/SignUpPage';
import DashboardLayout from '../components/dashboard/DashboardLayout';

import NewsSection from '../components/dashboard/NewsSection';
import CreateNewsPost from '../components/dashboard/CreateNewsPost';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={
                <DashboardLayout>
                    <NewsSection />
                </DashboardLayout>
            } />
            <Route path="/dashboard/create-news" element={
                <DashboardLayout>
                    <CreateNewsPost />
                </DashboardLayout>
            } />
            {/* Add more routes here as needed */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
