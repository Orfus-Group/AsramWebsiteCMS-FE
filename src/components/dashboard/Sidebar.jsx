import React from 'react';

const SignOutIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H15M10 8L14 12M14 12L10 16M14 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SidebarItem = ({ label, active = false }) => (
    <div
        className={`flex items-center transition-all cursor-pointer font-['Montserrat'] font-semibold text-[16px] ${active ? 'bg-[#223f7f] text-white' : 'bg-white text-[#3a3a3a] hover:translate-x-1'
            }`}
        style={{
            marginBottom: '8px',
            paddingLeft: '20px',
            paddingRight: '20px',
            height: '52px',
            borderRadius: '8px',
            borderRight: '4px solid #223f7f',
            lineHeight: '1.38',
            textAlign: 'left'
        }}
    >
        {label}
    </div>
);

const SectionTitle = ({ title }) => (
    <div
        className="font-['Montserrat']"
        style={{
            marginBottom: '8px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#191919',
            lineHeight: '1.38',
            textAlign: 'left'
        }}
    >
        {title}
    </div>
);

const Sidebar = ({ isOpen = false, onClose }) => {
    return (
        <div
            // FIX: Changed from 'fixed' to 'fixed md:relative'.
            // On mobile (default), it's 'fixed' (drawer behavior).
            // On desktop (md), it's 'relative' (flex layout behavior).
            // This allows it to sit side-by-side with content without standard CSS overlap issues.
            className={`flex flex-col h-screen shrink-0 fixed md:relative left-0 top-0 bg-[#EEF2F7] transition-transform duration-300 ease-in-out z-50
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0`}
            style={{
                width: '276px',
                padding: '24px',
                borderTopRightRadius: '20px',
                borderBottomRightRadius: '20px',
            }}
        >
            {/* Close Button - Mobile Only */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-[#223f7f] hover:bg-white rounded-lg transition-all md:hidden"
                aria-label="Close menu"
            >
                <CloseIcon />
            </button>

            {/* Logo Area */}
            <div className="flex items-center justify-center gap-2" style={{ marginBottom: '50px' }}>
                <img src="/ASymbol.png" alt="Asram" style={{ width: '44.5px', height: '44.1px' }} />
                <span className="font-['Montserrat'] font-semibold text-[40.3px] leading-none text-[#223f7f]">Asram</span>
            </div>

            {/* Navigation */}
            <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">

                <SectionTitle title="Content" />
                <SidebarItem label="News" active={true} />
                <SidebarItem label="Events" />

                <div style={{ marginTop: '20px' }}>
                    <SectionTitle title="Users" />
                    <SidebarItem label="User Management" />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <SectionTitle title="Forms" />
                    <SidebarItem label="Enquiries" />
                </div>

            </div>

            {/* Sign Out Button */}
            <div className="mt-auto" style={{ marginTop: '52px' }}>
                <button
                    className="flex items-center justify-center font-['Montserrat'] font-semibold text-[16px] transition-all hover:opacity-80"
                    style={{
                        width: '220px',
                        height: '52px',
                        padding: '20px',
                        gap: '10px',
                        borderRadius: '8px',
                        borderRight: '4px solid #223f7f',
                        backgroundColor: 'rgba(192, 57, 43, 0.1)',
                        color: 'rgba(25, 25, 25, 0.75)',
                        lineHeight: '1.38',
                        textAlign: 'left'
                    }}
                >
                    Sign Out
                    <SignOutIcon />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
