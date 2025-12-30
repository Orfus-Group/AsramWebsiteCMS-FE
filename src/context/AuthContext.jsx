import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

/**
 * Authentication Context
 * Provides global auth state and methods throughout the app
 */
const AuthContext = createContext(null);

/**
 * Auth Provider Component
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Initialize auth state on mount
     * Check if user has valid token and fetch user data
     */
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                // Fetch current user data
                const userData = await authService.getCurrentUser();
                setUser(userData);
                setIsAuthenticated(true);
            } catch (err) {
                console.error('Failed to fetch user data:', err);
                // Clear invalid tokens
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');
                sessionStorage.removeItem('authToken');
                sessionStorage.removeItem('refreshToken');
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    /**
     * Sign in method
     */
    const signIn = async (credentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.signIn(credentials);

            // Store tokens
            const storage = credentials.rememberMe ? localStorage : sessionStorage;
            storage.setItem('authToken', response.token);
            storage.setItem('refreshToken', response.refreshToken);

            // Set user state
            setUser(response.user);
            setIsAuthenticated(true);

            return response;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Sign in failed';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Sign out method
     */
    const signOut = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await authService.signOut();

            // Clear tokens and user state
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('refreshToken');

            setUser(null);
            setIsAuthenticated(false);
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Sign out failed';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Update user profile
     */
    const updateUser = async (userData) => {
        setIsLoading(true);
        setError(null);

        try {
            const updatedUser = await authService.updateProfile(userData);
            setUser(updatedUser);
            return updatedUser;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Profile update failed';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,
        error,
        signIn,
        signOut,
        updateUser,
        setError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook to use auth context
 */
export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }

    return context;
};
