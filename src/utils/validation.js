/**
 * Form Validation Utilities
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and requirements
 */
export const validatePassword = (password) => {
    const requirements = {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const isValid = Object.values(requirements).every(req => req);

    return {
        isValid,
        requirements
    };
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} Is valid
 */
export const isRequired = (value) => {
    if (typeof value === 'string') {
        return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
};

/**
 * Validate min length
 * @param {string} value - Value to validate
 * @param {number} min - Minimum length
 * @returns {boolean} Is valid
 */
export const minLength = (value, min) => {
    return value.length >= min;
};

/**
 * Validate max length
 * @param {string} value - Value to validate
 * @param {number} max - Maximum length
 * @returns {boolean} Is valid
 */
export const maxLength = (value, max) => {
    return value.length <= max;
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid phone
 */
export const isValidPhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    const cleanPhone = phone.replace(/[\s\-\+\(\)]/g, '');
    return phoneRegex.test(phone) && cleanPhone.length >= 10;
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid URL
 */
export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Form validator
 * @param {Object} values - Form values
 * @param {Object} rules - Validation rules
 * @returns {Object} Validation errors
 */
export const validateForm = (values, rules) => {
    const errors = {};

    Object.keys(rules).forEach(field => {
        const fieldRules = rules[field];
        const value = values[field];

        fieldRules.forEach(rule => {
            if (rule.type === 'required' && !isRequired(value)) {
                errors[field] = rule.message || 'This field is required';
            }

            if (rule.type === 'email' && value && !isValidEmail(value)) {
                errors[field] = rule.message || 'Invalid email format';
            }

            if (rule.type === 'minLength' && value && !minLength(value, rule.value)) {
                errors[field] = rule.message || `Minimum length is ${rule.value}`;
            }

            if (rule.type === 'maxLength' && value && !maxLength(value, rule.value)) {
                errors[field] = rule.message || `Maximum length is ${rule.value}`;
            }

            if (rule.type === 'password' && value) {
                const validation = validatePassword(value);
                if (!validation.isValid) {
                    errors[field] = rule.message || 'Password does not meet requirements';
                }
            }

            if (rule.type === 'phone' && value && !isValidPhone(value)) {
                errors[field] = rule.message || 'Invalid phone number';
            }

            if (rule.type === 'url' && value && !isValidUrl(value)) {
                errors[field] = rule.message || 'Invalid URL';
            }

            if (rule.type === 'custom' && rule.validator && !rule.validator(value)) {
                errors[field] = rule.message || 'Validation failed';
            }
        });
    });

    return errors;
};
