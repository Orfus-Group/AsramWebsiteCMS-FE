/**
 * API Client Configuration
 * Centralized HTTP client with interceptors for auth, error handling, etc.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Create request configuration with auth headers
 */
const createConfig = (config = {}) => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

    const headers = {
        'Content-Type': 'application/json',
        ...config.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return {
        ...config,
        headers
    };
};

/**
 * HTTP Client
 */
export const apiClient = {
    /**
     * GET request
     */
    async get(url, config = {}) {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            method: 'GET',
            ...createConfig(config)
        });

        return handleResponse(response);
    },

    /**
     * POST request
     */
    async post(url, data, config = {}) {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            method: 'POST',
            body: JSON.stringify(data),
            ...createConfig(config)
        });

        return handleResponse(response);
    },

    /**
     * PUT request
     */
    async put(url, data, config = {}) {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            ...createConfig(config)
        });

        return handleResponse(response);
    },

    /**
     * PATCH request
     */
    async patch(url, data, config = {}) {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            ...createConfig(config)
        });

        return handleResponse(response);
    },

    /**
     * DELETE request
     */
    async delete(url, config = {}) {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            method: 'DELETE',
            ...createConfig(config)
        });

        return handleResponse(response);
    }
};

/**
 * Handle API response
 */
async function handleResponse(response) {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        // Handle specific error cases
        if (response.status === 401) {
            // Unauthorized - clear tokens and redirect to sign in
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('refreshToken');

            if (window.location.pathname !== '/signin') {
                window.location.href = '/signin';
            }
        }

        const error = new Error(data.message || 'An error occurred');
        error.response = { data, status: response.status };
        throw error;
    }

    return { data, status: response.status };
}

/**
 * Request interceptor
 * Can be used to add additional logic before requests
 */
export const addRequestInterceptor = (interceptor) => {
    // Implementation for request interceptors if needed
    console.log('Request interceptor added:', interceptor);
};

/**
 * Response interceptor
 * Can be used to add additional logic after responses
 */
export const addResponseInterceptor = (interceptor) => {
    // Implementation for response interceptors if needed
    console.log('Response interceptor added:', interceptor);
};
