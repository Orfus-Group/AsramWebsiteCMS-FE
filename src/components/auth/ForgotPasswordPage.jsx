import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import Input from '../common/Input';
import Button from '../common/Button';

// Back Arrow with specific blue color
const BackArrowIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.375 7H2.625" stroke="#223F7F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.125 3.5L2.625 7L6.125 10.5" stroke="#223F7F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleBackToLogin = () => {
        navigate('/login');
    };

    const handleInputChange = (e) => {
        setEmail(e.target.value);
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('Reset instructions sent (simulated). Check console.');
            console.log('Forgot Password Request:', email);
        } catch (err) {
            setError('Failed to send instructions. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const bottomDisclaimer = (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                minHeight: '60px',
                padding: '17px'
            }}
        >
            <p className="text-[#94A3B8] text-[12px] leading-[1.5] font-normal font-sans m-0">
                This is a secure system. Your session will expire after 30 minutes of inactivity. Never share your login credentials with anyone.
            </p>
        </div>
    );

    return (
        <AuthLayout bottomContent={bottomDisclaimer}>
            <div className="flex flex-col w-full h-full">
                {/* Header Section */}
                <div className="flex flex-col">
                    <button
                        onClick={handleBackToLogin}
                        className="flex items-center gap-2 text-[#223f7f] hover:text-[#1a3163] transition-colors group"
                        style={{
                            marginBottom: '14px',
                            fontSize: '14px',
                            fontWeight: '500',
                            lineHeight: '20px',
                            fontFamily: 'Montserrat, sans-serif'
                        }}
                    >
                        <span className="group-hover:-translate-x-1 transition-transform duration-200">
                            <BackArrowIcon />
                        </span>
                        Back to Sign In
                    </button>

                    <h2 style={{
                        marginBottom: '6px',

                    }} className=" text-[24px] leading-[32px] font-medium text-[#0f172a] mb-[12px] font-['Montserrat']">
                        Forgot Password
                    </h2>
                    <p className="text-[#64748B] text-[14px] leading-[20px] font-normal font-sans">
                        Enter your email to receive reset instructions
                    </p>
                </div>

                {/* Full Width Divider */}
                <div style={{
                    height: '1px',
                    backgroundColor: '#E2E8F0',
                    margin: '24px -30px', // Negative margin to stretch full width
                }} />

                <form onSubmit={handleSubmit} className="flex flex-col flex-1">

                    <div className="flex flex-col gap-6">
                        <Input
                            label="Email Address"
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            placeholder="your.email@asram.edu.in"
                            error={error}
                            className="bg-white"
                        />

                        {/* Info Box */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'stretch',
                                padding: '16px',
                                borderRadius: '8px',
                                backgroundColor: '#EEF2F7',
                            }}
                        >
                            <p
                                style={{
                                    color: '#1E293B',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    lineHeight: '1.5',
                                    fontFamily: 'Montserrat, sans-serif',
                                    margin: 0
                                }}
                            >
                                A password reset link will be sent to your registered email address. The link will be valid for 1 hour. If you don't receive the email within a few minutes, please check your spam folder.
                            </p>
                        </div>

                        <div className="mt-2">
                            <Button
                                type="submit"
                                variant="primary"
                                size="medium"
                                fullWidth
                                isLoading={isLoading}
                                className="bg-[#1E3A8A] hover:bg-[#1e40af]"
                                style={{
                                    fontWeight: '400',
                                    fontFamily: 'Montserrat, sans-serif'
                                }}
                            >
                                Send Reset Instructions
                            </Button>
                        </div>
                    </div>

                    {/* Full Width Divider */}
                    <div style={{
                        height: '1px',
                        backgroundColor: '#E2E8F0',
                        margin: '24px -30px', // Negative margin
                    }} />

                    {/* Footer Contact */}
                    <div className="text-center">
                        <span className="text-[#64748B] text-[14px] font-normal font-sans">
                            Still having trouble? Contact{' '}
                            <span className="text-[#223f7f] font-medium">
                                support@asram.edu.in
                            </span>
                        </span>
                    </div>

                </form>
            </div>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
