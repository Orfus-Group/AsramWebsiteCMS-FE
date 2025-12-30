import { useState, useCallback } from 'react';
import { authService } from '../services/authService';

/**
 * Custom hook for authentication operations
 * Manages auth state and provides methods for sign in, sign out, etc.
 */
export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    /**
     * Sign in with email/username and password
     * @param {Object} credentials - Login credentials
     * @param {string} credentials.identifier - Email or user ID
     * @param {string} credentials.password - User password
     * @param {boolean} credentials.rememberMe - Remember user session
     */
    const signIn = useCallback(async (credentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.signIn(credentials);

            // Store auth token
            if (credentials.rememberMe) {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('refreshToken', response.refreshToken);
            } else {
                sessionStorage.setItem('authToken', response.token);
                sessionStorage.setItem('refreshToken', response.refreshToken);
            }

            // Set user data
            setUser(response.user);

            // Redirect to dashboard or intended page
            window.location.href = response.redirectUrl || '/dashboard';

            return response;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Sign in failed. Please try again.';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Sign in with SSO
     */
    const signInWithSSO = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.signInWithSSO();

            // Redirect to SSO provider
            window.location.href = response.ssoUrl;

            return response;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'SSO sign in failed. Please try again.';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Sign out current user
     */
    const signOut = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            await authService.signOut();

            // Clear tokens
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('refreshToken');

            // Clear user data
            setUser(null);

            // Redirect to sign in page
            window.location.href = '/signin';
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Sign out failed. Please try again.';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Request password reset
     * @param {string} email - User email
     */
    const requestPasswordReset = useCallback(async (email) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.requestPasswordReset(email);
            return response;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Password reset request failed. Please try again.';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Refresh auth token
     */
    const refreshToken = useCallback(async () => {
        const storedRefreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');

        if (!storedRefreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await authService.refreshToken(storedRefreshToken);

            // Update tokens
            const storage = localStorage.getItem('authToken') ? localStorage : sessionStorage;
            storage.setItem('authToken', response.token);
            storage.setItem('refreshToken', response.refreshToken);

            return response;
        } catch (err) {
            // If refresh fails, sign out user
            await signOut();
            throw err;
        }
    }, [signOut]);

    return {
        user,
        isLoading,
        error,
        signIn,
        signInWithSSO,
        signOut,
        requestPasswordReset,
        refreshToken,
        setError
    };
};
