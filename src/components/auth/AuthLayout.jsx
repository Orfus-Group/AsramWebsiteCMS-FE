import React from 'react';
import Logo from '../common/Logo';

const AuthLayout = ({ children }) => {
    return (
        <div
            className="min-h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center py-[60px]"
            style={{
                backgroundImage: `url('${import.meta.env.BASE_URL}signinbg.png')`
            }}
        >
            <div
                className="flex items-center w-full max-w-[1440px]"
                style={{
                    paddingLeft: '120px',
                    paddingRight: '210px',
                    gap: '172.9px'
                }}
            >
                {/* Left Section - Branding */}
                <div className="flex flex-col">
                    <div style={{
                        width: '361.6px',
                        height: '128px',
                        marginTop: '58.5px',
                        marginBottom: '68.9px',
                        marginLeft: '33.9px'
                    }}>
                        <Logo variant="full" className="w-full h-full" />
                    </div>

                    <div
                        className="flex items-center"
                        style={{
                            width: '468.1px',
                            height: '284px',
                            marginBottom: '58.5px',
                            padding: '40px',
                            gap: '10px',
                            backgroundColor: '#EEF2F7',
                            borderRadius: '32px'
                        }}
                    >
                        <h1
                            className="font-sans font-normal mb-0 tracking-normal"
                            style={{
                                width: '388.1px',
                                height: '204px',
                                fontSize: '42px',
                                lineHeight: '1.21',
                                color: '#223f7f',
                                textAlign: 'left',
                                fontFamily: 'Montserrat, sans-serif'
                            }}
                        >
                            Every update we make strengthens learning, care, and trust
                        </h1>
                    </div>
                </div>

                {/* Right Section - Form Container */}
                <div className="flex flex-col">
                    <div
                        className="bg-white flex flex-col"
                        style={{
                            width: '469px',
                            padding: '30px',
                            borderRadius: '11.7px',
                            boxShadow: '0 4px 5px 0 rgba(0,0,0,0.25)'
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
