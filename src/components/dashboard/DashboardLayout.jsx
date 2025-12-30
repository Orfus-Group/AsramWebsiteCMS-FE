import React, { useState } from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-white font-sans">
            {/* Mobile Header - Sticky Top */}
            <div className="fixed top-0 left-0 right-0 h-[60px] bg-white z-40 flex items-center justify-between px-4 shadow-sm md:hidden">
                <div className="flex items-center gap-3">
                    <img src="/ASymbol.png" alt="Asram" className="w-8 h-8" />
                    <span className="font-['Montserrat'] font-semibold text-lg text-[#223f7f]">Asram</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-[#223f7f] hover:bg-gray-100 rounded-lg"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>
                </button>
            </div>

            {/* Overlay - Mobile Only */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[60] md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label="Close menu"
                    style={{ transition: 'opacity 300ms ease-in-out' }}
                />
            )}

            {/* Sidebar - Desktop Flex Item, Mobile Drawer */}
            {/* Sidebar is now md:relative, so it pushes content naturally. No overlap possible. */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            {/* Removed all margins/paddings for desktop offset. */}
            {/* The flex container handles the layout automatically now. */}
            <div className="flex-1 h-screen overflow-y-auto bg-white pt-[60px] md:pt-0">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
