import React, { useState, useEffect } from 'react';

const Enquiries = () => {
    const [padding, setPadding] = useState('24px 40px');

    // MOCK DATA based on Figma
    const stats = [
        { label: 'Total Enquiries', value: '5' },
        { label: 'New', value: '4' },
        { label: 'In Progress', value: '2' },
        { label: 'Closed', value: '2' },
    ];

    const enquiries = [
        { id: 1, name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com', phone: '+91 98765 12345', type: 'Admissions', source: '/admissions', school: 'Medical College', status: 'In Progress', date: '05 Jan 2026, 10:30 AM' },
        { id: 2, name: 'Priya Sharma', email: 'priya.s@example.com', phone: '+91 98765 12345', type: 'Event Registration', source: '/events/surgery-conference', school: 'Medical College', status: 'In Progress', date: '05 Jan 2026, 10:30 AM' },
        { id: 3, name: 'Dr. Anil Verma', email: 'anil.verma@example.com', phone: '+91 98765 12345', type: 'Contact Us', source: '/contact', school: 'School of Nursing', status: 'Closed', date: '05 Jan 2026, 10:30 AM' },
        { id: 4, name: 'Lakshmi Reddy', email: 'lakshmi.r@example.com', phone: '+91 98765 12345', type: 'Admissions', source: '/nursing/admissions', school: 'School of Nursing', status: 'New', date: '05 Jan 2026, 10:30 AM' },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setPadding('16px');
            } else {
                setPadding('24px 40px');
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'In Progress': return { backgroundColor: '#F59E0B', color: '#fff' }; // Orange
            case 'Closed': return { backgroundColor: '#6B7280', color: '#fff' };      // Gray
            case 'New': return { backgroundColor: '#009688', color: '#fff' };         // Teal/Green
            default: return {};
        }
    };

    return (
        <div className="flex flex-col w-full h-full font-['Montserrat'] bg-white pb-10"
            style={{ padding: padding, overflowY: 'auto' }}>

            {/* Header */}
            <h1 className="text-[24px] font-semibold text-[#223f7f]" style={{ marginBottom: '40px' }}>
                Enquiries
            </h1>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
                marginBottom: '40px'
            }}>
                {stats.map((stat, index) => (
                    <div key={index}
                        className="flex flex-col justify-center"
                        style={{
                            height: '110px',
                            padding: '20px',
                            gap: '8px',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            backgroundColor: '#fff'
                        }}>
                        <span className="text-[14px] text-[#191919] opacity-75 leading-none">{stat.label}</span>
                        <span className="text-[32px] font-medium text-[#191919] leading-none">{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Filter Section */}
            <div className="flex items-center w-full"
                style={{
                    height: '58px',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    marginBottom: '24px',
                    gap: '40px' // Spacing between groups
                }}>
                {/* Filters Label */}
                <div className="flex items-center gap-[8px] text-[#191919] text-[14px] shrink-0 whitespace-nowrap">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M6.66708 13.3333V9.33333L1.50574 3.11333H14.4937L9.33374 9.33333V14L6.66708 13.3333Z"
                            stroke="#223F7F"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className="font-semibold">Filters:</span>
                </div>

                {/* Filters Container */}
                <div className="enquiries-filters-wrapper flex-1 min-w-0">
                    {/* Form Type */}
                    <div className="enquiries-filter-group">
                        <span className="text-[14px] text-[#191919]/70 whitespace-nowrap">
                            Form Type:
                        </span>

                        <div className="enquiries-filter-select">
                            <span className="text-[14px] text-[#191919] truncate ">
                                All Types
                            </span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="enquiries-filter-group">
                        <span className="text-[14px] text-[#191919]/70 whitespace-nowrap">
                            Status:
                        </span>

                        <div className="enquiries-filter-select" />
                    </div>

                    {/* Institute */}
                    <div className="enquiries-filter-group">
                        <span className="text-[14px] text-[#191919]/70 whitespace-nowrap">
                            Institute:
                        </span>

                        <div className="enquiries-filter-select" />
                    </div>
                </div>
            </div>



            {/* Table Section */}
            <div className="w-full overflow-x-auto rounded-[8px] border border-[#e0e0e0]">
                <div className="flex flex-col bg-white overflow-hidden">

                    {/* Table Header */}
                    <div className="enquiries-table-grid bg-[#f6f8fb] border-b border-[#e0e0e0]"
                        style={{
                            height: '52.5px'
                        }}>
                        {['Name', 'Email / Phone', 'Form Type', 'Source Page', 'Assigned School', 'Actions', 'Received Date'].map((head, i) => (
                            <div key={i} className={`flex items-center ${i === 0 || i === 3 ? 'justify-start pl-[20px]' : i === 1 ? 'justify-start' : 'justify-center'} font-bold text-[14px] text-[#191919] leading-[1.43] whitespace-nowrap`}
                                style={{ padding: i === 0 || i === 3 ? '0 20px' : i === 1 ? '0' : '0 10px' }}>{head}</div>
                        ))}
                    </div>

                    {/* Table Body */}
                    {enquiries.map((row) => (
                        <div key={row.id} className="enquiries-table-grid border-b border-[#e0e0e0] last:border-b-0"
                            style={{
                                height: '80px', // Taller rows for multi-line content
                                alignItems: 'center'
                            }}>

                            {/* Name */}
                            <div className="flex items-center text-[14px] text-[#191919]"
                                style={{ padding: '20px' }}>
                                {row.name}
                            </div>

                            {/* Email/Phone */}
                            <div className="flex flex-col justify-center gap-[4px]">
                                <span className="text-[12px] text-[#191919]">{row.email}</span>
                                <span className="text-[12px] text-[#191919] opacity-60">{row.phone}</span>
                            </div>

                            {/* Form Type */}
                            <div className="flex justify-center">
                                <span className="bg-[#eef2f7] text-[#223f7f] text-[12px] font-medium"
                                    style={{
                                        height: '36px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '8px 12px',
                                        borderRadius: '6px'
                                    }}>
                                    {row.type}
                                </span>
                            </div>

                            {/* Source */}
                            <div className="flex items-center text-[12px] text-[#191919] whitespace-nowrap"
                                style={{ padding: '0 20px' }}>
                                {row.source}
                            </div>

                            {/* School */}
                            <div className="flex justify-center">
                                <span className="bg-[#eef2f7] text-[#223f7f] text-[12px] font-medium"
                                    style={{
                                        height: '36px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '8px 12px',
                                        borderRadius: '6px'
                                    }}>
                                    {row.school}
                                </span>
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-center">
                                <button
                                    className="text-[12px] font-medium"
                                    style={{
                                        ...getStatusStyle(row.status),
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '4px',
                                        padding: '4px 12px',
                                        borderRadius: '6px',
                                        width: '100%', // Allow it to fill or set a specific width if needed, initially fill container
                                        maxWidth: '120px' // Reasonable max width
                                    }}
                                >
                                    {row.status}
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
                                </button>
                            </div>

                            {/* Date */}
                            <div className="flex flex-col items-center justify-center text-[12px] text-[#191919] opacity-80">
                                <span>05 Jan 2026,</span>
                                <span>10:30 AM</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Enquiries;
