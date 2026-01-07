import React, { useState, useEffect } from 'react';

const EditUserModal = ({ isOpen, onClose, user }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'Active',
        role: 'Admin',
        institute: 'All'
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                status: user.status || 'Active',
                role: user.role || 'Admin',
                institute: user.school || 'All'
            });
        }
    }, [user]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Form Data Submitted:', formData);
        // API integration would go here
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(167, 167, 167, 0.5)' }}>
            <div className="bg-white rounded-[8px] w-full max-w-[672px] max-h-[95vh] overflow-y-auto relative flex flex-col shadow-lg"
                style={{ width: '672px' }}>

                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-[#e0e0e0]"
                    style={{ height: '85px', minHeight: '85px', padding: '0 24px' }}>
                    <h2 className="font-['Montserrat'] text-[20px] text-[#191919]"
                        style={{ fontWeight: 400, lineHeight: '1.4' }}>Edit User</h2>
                    <button onClick={onClose} className="text-[#191919] hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer" style={{ cursor: 'pointer' }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5L5 15" stroke="#191919" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5 5L15 15" stroke="#191919" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Modal Content */}
                <div className="flex flex-col" style={{ padding: '24px 24px 32px 24px' }}>

                    {/* Basic Information Section */}
                    <div className="flex flex-col gap-[16px]">
                        <h3 className="font-['Montserrat'] font-medium text-[16px] text-[#191919]">Basic Information</h3>

                        {/* Full Name */}
                        <div className="flex flex-col gap-[8px]">
                            <label className="font-['Montserrat'] text-[14px] text-[#191919]">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full h-[42px] border border-[#e0e0e0] rounded-[8px] font-['Montserrat'] text-[16px] text-[#191919] focus:outline-none focus:border-[#223f7f] placeholder-[rgba(25,25,25,0.5)]"
                                style={{ padding: '8px 16px', color: 'rgba(25, 25, 25, 0.5)' }}
                            />
                        </div>

                        {/* Email Address */}
                        <div className="flex flex-col gap-[8px]">
                            <label className="font-['Montserrat'] text-[14px] text-[#191919]">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                                className="w-full h-[42px] border border-[#e0e0e0] rounded-[8px] font-['Montserrat'] text-[16px] bg-[#eef2f7] select-none placeholder-[rgba(25,25,25,0.5)]"
                                style={{ padding: '8px 16px', color: 'rgba(25, 25, 25, 0.5)' }}
                            />
                            <span className="text-[12px] text-[rgba(25,25,25,0.6)] font-['Montserrat']">
                                Email cannot be changed after creation
                            </span>
                        </div>

                        {/* Phone Number */}
                        <div className="flex flex-col gap-[8px]">
                            <label className="font-['Montserrat'] text-[14px] text-[#191919]">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full h-[42px] border border-[#e0e0e0] rounded-[8px] font-['Montserrat'] text-[16px] text-[#191919] focus:outline-none focus:border-[#223f7f] placeholder-[rgba(25,25,25,0.5)]"
                                style={{ padding: '8px 16px', color: 'rgba(25, 25, 25, 0.5)' }}
                            />
                        </div>

                        {/* Status */}
                        <div className="flex flex-col gap-[12px]">
                            <label className="font-['Montserrat'] text-[14px] text-[#191919]">
                                Status
                            </label>
                            <div className="flex items-center gap-[24px]">
                                <label className="flex items-center gap-[8px] cursor-pointer">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Active"
                                        checked={formData.status === 'Active'}
                                        onChange={handleChange}
                                        className="w-[18px] h-[18px] accent-[#223f7f]"
                                    />
                                    <span className="font-['Montserrat'] text-[14px] text-[#191919]">Active</span>
                                </label>
                                <label className="flex items-center gap-[8px] cursor-pointer">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Inactive"
                                        checked={formData.status === 'Inactive'}
                                        onChange={handleChange}
                                        className="w-[18px] h-[18px] accent-[#223f7f]"
                                    />
                                    <span className="font-['Montserrat'] text-[14px] text-[#191919]">Inactive</span>
                                </label>
                            </div>
                        </div>
                    </div>



                    {/* Role Assignment Section */}
                    <div className="flex flex-col gap-[16px]" style={{ marginTop: '25px' }}>
                        <h3 className="font-['Montserrat'] font-medium text-[16px] text-[#191919]">Role Assignment</h3>

                        {/* User Role */}
                        <div className="flex flex-col gap-[8px]">
                            <label className="font-['Montserrat'] text-[14px] text-[#191919]">
                                User Role <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full h-[42px] border border-[#e0e0e0] rounded-[8px] font-['Montserrat'] text-[14px] text-[#191919] appearance-none focus:outline-none focus:border-[#223f7f] bg-white"
                                    style={{ padding: '8px 16px', color: 'rgba(25, 25, 25, 0.75)' }}>
                                    <option>Admin</option>
                                    <option>Editor</option>
                                    <option>Viewer</option>
                                </select>
                                <div className="absolute right-[16px] top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Admin Role Info Box */}
                        <div className="flex items-center gap-[12px] rounded-[8px]"
                            style={{
                                backgroundColor: '#eef2f7',
                                padding: '16px 20px',
                                height: '72px',
                                alignSelf: 'stretch'
                            }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-[2px] flex-shrink-0">
                                <path d="M10.0003 18.3346C14.6027 18.3346 18.3337 14.6037 18.3337 10.0013C18.3337 5.39893 14.6027 1.66797 10.0003 1.66797C5.39795 1.66797 1.66699 5.39893 1.66699 10.0013C1.66699 14.6037 5.39795 18.3346 10.0003 18.3346Z" stroke="#223F7F" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 6.66797V10.0013" stroke="#223F7F" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 13.332H10.0083" stroke="#223F7F" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <div className="flex flex-col gap-[4px]" style={{ flex: 1 }}>
                                <span className="font-['Montserrat'] font-medium text-[12px] text-[#191919]">Admin Role</span>
                                <span className="font-['Montserrat'] text-[12px] text-[#191919] opacity-70 leading-[1.4]">
                                    Full access within one assigned school. Can manage all content for that school.
                                </span>
                            </div>
                        </div>

                        {/* Assigned Institute */}
                        <div className="flex flex-col gap-[8px]" style={{ marginTop: '16px' }}>
                            <label className="font-['Montserrat'] text-[14px] text-[#191919]">
                                Assigned Institute <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="institute"
                                    value={formData.institute}
                                    onChange={handleChange}
                                    className="w-full h-[42px] border border-[#e0e0e0] rounded-[8px] font-['Montserrat'] text-[14px] text-[#191919] appearance-none focus:outline-none focus:border-[#223f7f] bg-white"
                                    style={{ padding: '8px 16px', color: 'rgba(25, 25, 25, 0.75)' }}>
                                    <option>All</option>
                                    <option>Medical College</option>
                                    <option>School of Nursing</option>
                                </select>
                                <div className="absolute right-[16px] top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-[12px] text-[#9CA3AF] font-['Montserrat']">
                                This user will only have access to content from this school
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-[16px] mt-[32px]">
                        <button
                            onClick={onClose}
                            className="text-[#191919] font-['Montserrat'] font-medium text-[14px] opacity-70 hover:opacity-100 transition-opacity"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="user-modal-save-btn"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserManagement = () => {
    const [padding, setPadding] = useState('24px 40px');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Mock Data based on Figma
    const stats = [
        { label: 'Total Users', value: '5', width: '261px' },
        { label: 'Active Users', value: '4', width: '261px' },
        { label: 'Admins', value: '2', width: '261px' },
        { label: 'Editors', value: '2', width: '261px' },
    ];

    const users = [
        { id: 1, name: 'Ganesh', subName: '(You)', phone: '+91 98765 43210', email: 'Ganesh@asram.edu.in', role: 'Owner', roleColor: '#223f7f', school: 'All Schools', schoolColor: 'transparent', status: 'Active', statusColor: '#dcfce7' },
        { id: 2, name: 'Ganesh', phone: '+91 98765 43211', email: 'Ganesh@asram.edu.in', role: 'Admin', roleColor: '#10b981', school: 'Medical College', schoolColor: '#eff6ff', status: 'Active', statusColor: '#dcfce7' },
        { id: 3, name: 'Ganesh', phone: '+91 98765 43212', email: 'Ganesh@asram.edu.in', role: 'Editor', roleColor: '#6b7280', school: 'School of Nursing', schoolColor: '#eff6ff', status: 'Active', statusColor: '#dcfce7' },
        { id: 4, name: 'Ganesh', phone: '+91 98765 43213', email: 'Ganesh@asram.edu.in', role: 'Admin', roleColor: '#10b981', school: 'Paramedical College', schoolColor: '#eff6ff', status: 'Active', statusColor: '#dcfce7' },
        { id: 5, name: 'Ganesh', phone: '+91 98765 43213', email: 'Ganesh@asram.edu.in', role: 'Editor', roleColor: '#6b7280', school: 'School of Nursing', schoolColor: '#eff6ff', status: 'Inactive', statusColor: '#f3f4f6' },
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
        handleResize(); // Init

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    return (
        <div className="flex flex-col w-full h-full font-['Montserrat'] bg-white pb-10"
            style={{ padding: padding, overflowY: 'auto' }}>

            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={selectedUser}
            />

            {/* Header */}
            <h1 className="text-[24px] font-semibold text-[#223f7f]" style={{ marginBottom: '40px' }}>
                User Management
            </h1>

            {/* Stats Grid */}
            <div className="flex flex-wrap" style={{ gap: '24px', marginBottom: '40px' }}>
                {stats.map((stat, index) => (
                    <div key={index}
                        style={{
                            width: window.innerWidth < 768 ? '100%' : '261px',
                            height: '110px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            backgroundColor: '#fff',
                            flexShrink: 0
                        }}>
                        <span className="text-[14px] text-[#191919] opacity-75 mb-[8px]">{stat.label}</span>
                        <span className="text-[32px] font-medium text-[#191919]">{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Table Section Wrapper for Horizontal Scroll */}
            <div className="w-full overflow-x-auto rounded-[8px] border border-[#e0e0e0]">
                <div className="flex flex-col bg-white overflow-hidden"
                    style={{ minWidth: '1104px' }}>

                    {/* Table Header */}
                    <div className="grid w-full bg-[#f6f8fb] border-b border-[#e0e0e0]"
                        style={{
                            gridTemplateColumns: '197.5px 287.8px 140px 240px 140px 1fr',
                            height: '52.5px'
                        }}>
                        {['Name', 'Email', 'Role', 'Assigned School', 'Status', 'Actions'].map((head, i) => (
                            <div key={i} className="flex items-center"
                                style={{
                                    height: '100%',
                                    paddingLeft: '24px',
                                    paddingRight: '24px'
                                }}>
                                <span className="font-['Montserrat'] font-bold text-[14px] text-[#191919] leading-[1.43]">{head}</span>
                            </div>
                        ))}
                    </div>

                    {/* Table Body */}
                    <div className="flex flex-col w-full">
                        {users.map((user, index) => (
                            <div key={user.id}
                                className="grid w-full border-b border-[#e0e0e0] last:border-b-0"
                                style={{
                                    gridTemplateColumns: '197.5px 287.8px 140px 240px 140px 1fr',
                                    height: '73px'
                                }}>

                                {/* Name */}
                                <div className="flex flex-col justify-center"
                                    style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                                    <div className="flex items-center gap-1">
                                        <span style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: '14px', color: '#191919' }}>
                                            {user.name}
                                        </span>
                                        {user.subName && <span className="text-[12px] text-gray-400">{user.subName}</span>}
                                    </div>
                                    <span style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: 'rgba(25, 25, 25, 0.6)', marginTop: '4px' }}>
                                        {user.phone}
                                    </span>
                                </div>

                                {/* Email */}
                                <div className="flex items-center"
                                    style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                                    <span style={{ fontFamily: 'Montserrat', fontSize: '14px', color: '#333' }}>
                                        {user.email}
                                    </span>
                                </div>

                                {/* Role */}
                                <div className="flex items-center"
                                    style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                                    <span className="text-white flex items-center justify-center"
                                        style={{
                                            backgroundColor: user.roleColor,
                                            minWidth: user.role === 'Owner' ? '64.8px' : 'auto',
                                            height: '24px',
                                            padding: '4px 12px',
                                            borderRadius: '6px',
                                            fontFamily: 'Montserrat',
                                            fontWeight: 400,
                                            fontSize: '12px',
                                            lineHeight: '16px'
                                        }}>
                                        {user.role}
                                    </span>
                                </div>

                                {/* Assigned School */}
                                <div className="flex items-center"
                                    style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                                    <span className="flex items-center justify-center"
                                        style={{
                                            backgroundColor: user.school === 'All Schools' ? 'transparent' : '#eff6ff',
                                            color: user.school === 'All Schools' ? 'rgba(25, 25, 25, 0.4)' : '#223f7f',
                                            height: user.school === 'All Schools' ? 'auto' : '24px',
                                            padding: user.school === 'All Schools' ? '0' : '4px 12px',
                                            borderRadius: '6px',
                                            fontFamily: 'Montserrat',
                                            fontWeight: 400,
                                            fontSize: user.school === 'All Schools' ? '14px' : '12px'
                                        }}>
                                        {user.school}
                                    </span>
                                </div>

                                {/* Status */}
                                <div className="flex items-center"
                                    style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                                    <span className="flex items-center justify-center"
                                        style={{
                                            backgroundColor: user.status === 'Active' ? '#dcfce7' : '#f3f4f6',
                                            color: user.status === 'Active' ? '#16a34a' : '#9ca3af',
                                            height: '24px',
                                            padding: '4px 12px',
                                            borderRadius: '6px',
                                            fontFamily: 'Montserrat',
                                            fontWeight: 400,
                                            fontSize: '12px'
                                        }}>
                                        {user.status}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center"
                                    style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className="text-[#223f7f] hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
