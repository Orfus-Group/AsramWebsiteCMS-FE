import { apiClient } from './apiClient';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
export const authService = {
    /**
     * Sign in with credentials
     * @param {Object} credentials - Login credentials
     * @param {string} credentials.identifier - Email or user ID
     * @param {string} credentials.password - User password
     * @param {boolean} credentials.rememberMe - Remember user session
     * @returns {Promise<Object>} Auth response with user data and tokens
     */
    async signIn(credentials) {
        const response = await apiClient.post('/auth/signin', {
            identifier: credentials.identifier,
            password: credentials.password,
            rememberMe: credentials.rememberMe
        });

        return response.data;
    },

    /**
     * Sign in with SSO
     * @returns {Promise<Object>} SSO redirect URL
     */
    async signInWithSSO() {
        const response = await apiClient.get('/auth/sso/initiate');
        return response.data;
    },

    /**
     * Handle SSO callback
     * @param {string} code - SSO authorization code
     * @param {string} state - SSO state parameter
     * @returns {Promise<Object>} Auth response with user data and tokens
     */
    async handleSSOCallback(code, state) {
        const response = await apiClient.post('/auth/sso/callback', {
            code,
            state
        });

        return response.data;
    },

    /**
     * Sign out current user
     * @returns {Promise<void>}
     */
    async signOut() {
        await apiClient.post('/auth/signout');
    },

    /**
     * Request password reset
     * @param {string} email - User email
     * @returns {Promise<Object>} Reset request response
     */
    async requestPasswordReset(email) {
        const response = await apiClient.post('/auth/forgot-password', {
            email
        });

        return response.data;
    },

    /**
     * Reset password with token
     * @param {string} token - Reset token from email
     * @param {string} newPassword - New password
     * @returns {Promise<Object>} Reset response
     */
    async resetPassword(token, newPassword) {
        const response = await apiClient.post('/auth/reset-password', {
            token,
            newPassword
        });

        return response.data;
    },

    /**
     * Refresh auth token
     * @param {string} refreshToken - Refresh token
     * @returns {Promise<Object>} New auth tokens
     */
    async refreshToken(refreshToken) {
        const response = await apiClient.post('/auth/refresh', {
            refreshToken
        });

        return response.data;
    },

    /**
     * Verify email with token
     * @param {string} token - Verification token from email
     * @returns {Promise<Object>} Verification response
     */
    async verifyEmail(token) {
        const response = await apiClient.post('/auth/verify-email', {
            token
        });

        return response.data;
    },

    /**
     * Request access (new user registration request)
     * @param {Object} data - Request access data
     * @returns {Promise<Object>} Request response
     */
    async requestAccess(data) {
        const response = await apiClient.post('/auth/request-access', data);
        return response.data;
    },

    /**
     * Get current user profile
     * @returns {Promise<Object>} User profile data
     */
    async getCurrentUser() {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },

    /**
     * Update user profile
     * @param {Object} data - Profile update data
     * @returns {Promise<Object>} Updated user profile
     */
    async updateProfile(data) {
        const response = await apiClient.put('/auth/profile', data);
        return response.data;
    }
};
