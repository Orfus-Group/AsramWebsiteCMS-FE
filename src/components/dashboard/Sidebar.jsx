import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

const SidebarItem = ({ label, active = false, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center transition-all cursor-pointer font-['Montserrat'] font-semibold text-[16px] select-none
            ${active
                ? 'bg-[#223f7f] text-white'
                : 'bg-white text-[#3a3a3a] hover:bg-[#223f7f]/10' // Hover opacity background
            }`}
        style={{
            marginBottom: '8px',
            paddingLeft: '20px',
            paddingRight: '20px',
            height: '52px',
            borderRadius: '8px',
            // Only show border on active to match design, or keep it consistent? 
            // Original code had borderRight on everything. Let's keep it but maybe change color for inactive?
            // Actually, original: borderRight: '4px solid #223f7f' for ALL.
            // If we want "same background color", we keep existing active logic.
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
    const navigate = useNavigate();
    // Local state for active selection
    // Default to 'News' or whatever makes sense
    const location = useLocation();
    const [activeItem, setActiveItem] = React.useState('News');

    React.useEffect(() => {
        const path = location.pathname;
        if (path.includes('/dashboard')) {
            if (path === '/event-dashboard') {
                setActiveItem('Events');
            } else if (path.includes('create')) {
                // Keep 'News' active for create news or maybe nothing? 
                // Defaulting to News for now as it's part of news flow usually
                setActiveItem('News');
            } else {
                setActiveItem('News');
            }
        } else if (path === '/event-dashboard') {
            setActiveItem('Events');
        }
    }, [location]);

    const handleItemClick = (label) => {
        setActiveItem(label);
        if (label === 'Events') {
            navigate('/event-dashboard');
        } else if (label === 'News') {
            navigate('/dashboard');
        }
        // if (window.innerWidth < 768 && onClose) onClose();
    };

    return (
        <div
            // FIX: Changed from 'fixed' to 'fixed md:relative'.
            // On mobile (default), it's 'fixed' (drawer behavior).
            // On desktop (md), it's 'relative' (flex layout behavior).
            // This allows it to sit side-by-side with content without standard CSS overlap issues.
            className={`flex flex-col h-screen shrink-0 fixed md:relative left-0 top-0 bg-[#EEF2F7] transition-transform duration-300 ease-in-out z-50 overflow-x-hidden
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
                <img src={`${import.meta.env.BASE_URL}ASymbol.png`} alt="Asram" style={{ width: '44.5px', height: '44.1px' }} />
                <span className="font-['Montserrat'] font-semibold text-[40.3px] leading-none text-[#223f7f]">Asram</span>
            </div>

            {/* Navigation */}
            <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar overflow-x-hidden">

                <SectionTitle title="Content" />
                <SidebarItem
                    label="News"
                    active={activeItem === 'News'}
                    onClick={() => handleItemClick('News')}
                />
                <SidebarItem
                    label="Events"
                    active={activeItem === 'Events'}
                    onClick={() => handleItemClick('Events')}
                />

                <div style={{ marginTop: '20px' }}>
                    <SectionTitle title="Users" />
                    <SidebarItem
                        label="User Management"
                        active={activeItem === 'User Management'}
                        onClick={() => handleItemClick('User Management')}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <SectionTitle title="Forms" />
                    <SidebarItem
                        label="Enquiries"
                        active={activeItem === 'Enquiries'}
                        onClick={() => handleItemClick('Enquiries')}
                    />
                </div>

            </div>

            {/* Sign Out Button */}
            <div className="mt-auto" style={{ marginTop: '52px' }}>
                <button
                    className="flex items-center justify-center font-['Montserrat'] font-semibold text-[16px] transition-all hover:opacity-80 cursor-pointer"
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
