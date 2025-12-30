import React, { useState } from 'react';

const CreateNewsPost = () => {
    // State for form fields
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [college, setCollege] = useState('');
    const [category, setCategory] = useState('');

    return (
        <div
            className="flex flex-col w-full h-full overflow-hidden font-['Montserrat'] bg-white"
            // MATCHING DASHBOARD LAYOUT PADDING EXACTLY (Top Fixed to 24px)
            style={{
                padding: '24px clamp(16px, 4vw, 48px) clamp(16px, 5vw, 48px) clamp(16px, 4vw, 48px)',
                maxWidth: '1240px'
            }}
        >
            {/* Header: Title + Disclaimer + Delete Button */}
            <div
                className="flex flex-row items-center justify-between w-full shrink-0"
                style={{ marginBottom: '12px' }}
            >
                <div className="flex flex-row items-baseline gap-[12px]">
                    <h1
                        className="font-semibold text-[#223f7f] m-0"
                        style={{
                            fontSize: '24px',
                            lineHeight: 'normal'
                        }}
                    >
                        News Section
                    </h1>
                    <span
                        className="font-normal"
                        style={{
                            fontSize: '14px',
                            color: 'rgba(25, 25, 25, 0.75)',
                            lineHeight: '1.43'
                        }}
                    >
                        This content will appear on the ASRAM website
                    </span>
                </div>

                {/* Delete Button */}
                <button
                    className="flex items-center justify-center transition-colors"
                    style={{
                        width: '157px',
                        height: '36px',
                        padding: '8px 24px',
                        borderRadius: '9px',
                        border: '1px solid rgba(7, 7, 7, 0.2)',
                        backgroundColor: 'rgba(192, 57, 43, 0.1)',
                        color: 'rgba(25, 25, 25, 0.75)',
                        fontSize: '18px',
                        fontWeight: '400',
                        lineHeight: '1.11',
                        fontFamily: 'Montserrat'
                    }}
                >
                    Delete
                </button>
            </div>

            {/* Title Input */}
            <div className="w-full shrink-0" style={{ marginBottom: '12px' }}>
                <textarea
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full focus:outline-none transition-all resize-none font-['Montserrat'] placeholder-[rgba(25,25,25,0.75)]"
                    style={{
                        height: '139px',
                        padding: '20px',
                        borderRadius: '9px',
                        border: '1px solid rgba(7, 7, 7, 0.2)',
                        backgroundColor: '#fff',
                        fontSize: '18px',
                        color: 'rgba(25, 25, 25, 0.75)',
                        lineHeight: '1.11'
                    }}
                />
            </div>

            {/* Content Text Area */}
            <div className="w-full flex-1 min-h-0" style={{ marginBottom: '20px' }}>
                <textarea
                    placeholder="Enter Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-full focus:outline-none transition-all resize-none font-['Montserrat'] placeholder-[rgba(25,25,25,0.75)]"
                    style={{
                        padding: '12px 20px',
                        borderRadius: '9px',
                        border: '1px solid rgba(7, 7, 7, 0.2)',
                        backgroundColor: '#fff',
                        fontSize: '18px',
                        color: 'rgba(25, 25, 25, 0.75)',
                        lineHeight: '1.5',
                        whiteSpace: 'pre-wrap'
                    }}
                />
            </div>

            {/* Bottom Grid: Image Upload (Left) + Controls (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full shrink-0">

                {/* Image Upload Area */}
                <div
                    className="w-full flex flex-col items-center justify-center cursor-pointer hover:bg-[#F8F9FA] transition-all group bg-white"
                    style={{
                        height: '289px',
                        border: '1px solid rgba(7, 7, 7, 0.2)',
                        borderRadius: '9px',
                        gap: '20px'
                    }}
                >
                    <div
                        className="flex items-center justify-center transition-colors bg-white"
                        style={{
                            width: '61.6px',
                            height: '61.6px',
                            borderRadius: '10.3px',
                            border: '1px solid #d3d3d3'
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="#3A3A3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="flex flex-col items-center gap-[6px]">
                        <span
                            className="font-normal font-['Montserrat']"
                            style={{
                                fontSize: '18px',
                                color: 'rgba(25, 25, 25, 0.75)',
                                lineHeight: '1.11'
                            }}
                        >
                            Upload Heading banner
                        </span>
                        <span className="text-[12px] text-[#888888]">
                            Recommended size (e.g., 1200×600)
                        </span>
                    </div>
                </div>

                {/* Right Side: Inputs & Buttons */}
                <div
                    className="flex flex-col gap-5 h-[289px]"
                    style={{ justifyContent: 'space-between' }}
                >

                    {/* Select College */}
                    <div className="relative w-full">
                        <select
                            value={college}
                            onChange={(e) => setCollege(e.target.value)}
                            className="w-full appearance-none focus:outline-none cursor-pointer bg-white"
                            style={{
                                height: '48px',
                                padding: '0 20px',
                                border: '1px solid rgba(7, 7, 7, 0.2)',
                                borderRadius: '9px',
                                fontSize: '18px',
                                color: 'rgba(25, 25, 25, 0.75)',
                                fontFamily: 'Montserrat'
                            }}
                        >
                            <option value="">Select College</option>
                            <option value="medical">Medical College</option>
                            <option value="nursing">Nursing College</option>
                            <option value="paramedical">Paramedical College</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L7 7.5L13 1.5" stroke="rgba(25, 25, 25, 0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Select Category */}
                    <div className="relative w-full">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full appearance-none focus:outline-none cursor-pointer bg-white"
                            style={{
                                height: '48px',
                                padding: '0 20px',
                                border: '1px solid rgba(7, 7, 7, 0.2)',
                                borderRadius: '9px',
                                fontSize: '18px',
                                color: 'rgba(25, 25, 25, 0.75)',
                                fontFamily: 'Montserrat'
                            }}
                        >
                            <option value="">Select News Category</option>
                            <option value="academic">Academic</option>
                            <option value="event">Event</option>
                            <option value="announcement">Announcement</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L7 7.5L13 1.5" stroke="rgba(25, 25, 25, 0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex flex-row items-center justify-between">
                        <button
                            className="flex items-center justify-center transition-colors"
                            style={{
                                width: '268px',
                                height: '48px',
                                backgroundColor: '#f6f8fb',
                                border: '1px solid rgba(7, 7, 7, 0.2)',
                                borderRadius: '9px',
                                fontSize: '18px',
                                color: 'rgba(25, 25, 25, 0.75)',
                                fontFamily: 'Montserrat',
                                fontWeight: '400'
                            }}
                        >
                            Draft
                        </button>
                        <span
                            style={{
                                fontFamily: 'Montserrat',
                                fontSize: '14px',
                                color: 'rgba(25, 25, 25, 0.75)',
                                lineHeight: '1.43'
                            }}
                        >
                            Changes not saved
                        </span>
                    </div>

                    {/* Submit Button */}
                    <button
                        className="w-full flex items-center justify-center transition-colors hover:bg-[#1a3366]"
                        style={{
                            height: '109px',
                            backgroundColor: '#223f7f',
                            border: '1px solid rgba(7, 7, 7, 0.2)',
                            borderRadius: '9px',
                            fontSize: '22px',
                            fontWeight: '600',
                            color: '#ffffff',
                            fontFamily: 'Montserrat'
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewsPost;
