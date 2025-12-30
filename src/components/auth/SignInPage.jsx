import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import Input from '../common/Input';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';

// Icons
const EmailIcon = () => (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5844 4.96094L9.21577 9.01756C8.99965 9.14309 8.75417 9.20921 8.50425 9.20921C8.25432 9.20921 8.00884 9.14309 7.79272 9.01756L1.41772 4.96094" stroke="#191919" strokeOpacity="0.75" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.1677 2.83594H2.83439C2.05199 2.83594 1.41772 3.4702 1.41772 4.2526V12.7526C1.41772 13.535 2.05199 14.1693 2.83439 14.1693H14.1677C14.9501 14.1693 15.5844 13.535 15.5844 12.7526V4.2526C15.5844 3.4702 14.9501 2.83594 14.1677 2.83594Z" stroke="#191919" strokeOpacity="0.75" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const LockIcon = () => (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.4591 7.78906H3.5424C2.76 7.78906 2.12573 8.42333 2.12573 9.20573V14.1641C2.12573 14.9465 2.76 15.5807 3.5424 15.5807H13.4591C14.2415 15.5807 14.8757 14.9465 14.8757 14.1641V9.20573C14.8757 8.42333 14.2415 7.78906 13.4591 7.78906Z" stroke="#191919" strokeOpacity="0.75" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.96033 7.78906V4.95573C4.96033 4.01642 5.33347 3.11558 5.99766 2.45139C6.66185 1.7872 7.56269 1.41406 8.50199 1.41406C9.4413 1.41406 10.3421 1.7872 11.0063 2.45139C11.6705 3.11558 12.0437 4.01642 12.0437 4.95573V7.78906" stroke="#191919" strokeOpacity="0.75" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SignInPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailOrUserId: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear errors on change
        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.emailOrUserId.trim()) {
            errors.emailOrUserId = 'Email or User ID is required';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const errors = validateForm();

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setIsLoading(true);
        try {
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Add actual authentication logic here
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleSSOSignIn = () => {
        // Implement SSO logic
        console.log('SSO Sign In clicked');
    };

    const handleRequestAccess = () => {
        navigate('/request-access');
    };

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: '30px' }}>
                <h2 className="font-sans text-[24px] leading-[32px] font-semibold text-[#1E3A5F] mb-[28px]">
                    Sign In
                </h2>
                <Input
                    label="Email Address / User ID"
                    type="text"
                    name="emailOrUserId"
                    value={formData.emailOrUserId}
                    onChange={handleInputChange}
                    placeholder="Enter your email or user ID"
                    error={validationErrors.emailOrUserId}
                    icon={<EmailIcon />}
                />

                <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    error={validationErrors.password}
                    icon={<LockIcon />}
                    rightIcon={
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            )}
                        </button>
                    }
                />

                <div className="flex items-center justify-between">
                    <Checkbox
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        label="Remember me"
                    />

                    <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-[14px] leading-[20px] font-normal text-[#223f7f] hover:text-[#1a3163] transition-colors"
                    >
                        Forgot Password?
                    </button>
                </div>

                {error && (
                    <div className="p-3 bg-red-50/50 border border-red-200 rounded-lg flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-red-500">
                            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm3.2 10.4l-1.6 1.6L8 8.8l-1.6 3.2-1.6-1.6L6.4 7.2 4.8 4l1.6-1.6L8 5.6l1.6-3.2 1.6 1.6L9.6 7.2l1.6 3.2z" fill="currentColor" fillOpacity="0" />
                            <circle cx="8" cy="8" r="8" fill="#FEE2E2" />
                            <path d="M8 4V9" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M8 12H8.01" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <p className="text-[13px] leading-tight text-red-600 font-medium">
                            {error === 'Failed to fetch' ? 'Unable to connect. Please check your internet.' : error}
                        </p>
                    </div>
                )}

                <div className="flex flex-col" style={{ gap: '10px' }}>
                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        fullWidth
                        isLoading={isLoading}
                    >
                        Sign In
                    </Button>

                    <div className="flex items-center w-full" style={{ marginTop: '10.1px', marginBottom: '12.4px', gap: '16px' }}>
                        <div className="h-[1.2px] flex-1 bg-[rgba(7,7,7,0.2)]"></div>
                        <span className="text-[14px] leading-[20px] font-normal text-[rgba(25,25,25,0.75)] shrink-0">
                            Or
                        </span>
                        <div className="h-[1.2px] flex-1 bg-[rgba(7,7,7,0.2)]"></div>
                    </div>

                    <Button
                        type="button"
                        variant="secondary"
                        size="large"
                        fullWidth
                        onClick={handleSSOSignIn}
                    >
                        Sign in with SSO
                    </Button>
                </div>
            </form>

            <div
                className="flex items-center justify-center border-t-[1.2px] border-[rgba(7,7,7,0.2)]"
                style={{
                    gap: '4px',
                    marginTop: '30px',
                    paddingTop: '30px'
                }}
            >
                <span className="text-[14px] leading-[20px] font-normal text-[rgba(25,25,25,0.75)]">
                    New user?
                </span>
                <button
                    type="button"
                    onClick={handleRequestAccess}
                    className="text-[14px] leading-[20px] font-medium text-[#223f7f] hover:text-[#1a3163] transition-colors"
                >
                    Request Access
                </button>
            </div>
        </AuthLayout>
    );
};

export default SignInPage;
