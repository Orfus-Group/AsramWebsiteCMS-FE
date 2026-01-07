import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// -- ICONS --
const IconBack = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
);
const IconCalendar = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);
const IconClock = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);
const IconShare = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
);
const IconUser = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);
const IconTag = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
);

// -- MOCK DATA / CONSTANTS --
const T = { font: { family: "font-['Montserrat']" } };
const DoctorImg = "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=random"; // Placeholder

// Mock Related Articles
const relatedArticles = [
    {
        id: 101,
        image: "https://via.placeholder.com/400x300",
        title: "Advancements in Robotic Surgery: A New Era",
        category: "Research",
        tag: "Surgery",
        date: "Dec 10, 2024"
    },
    {
        id: 102,
        image: "https://via.placeholder.com/400x300",
        title: "Community Health Camp Serves Over 1000 Patients",
        category: "Event",
        tag: "Community",
        date: "Dec 12, 2024"
    },
    {
        id: 103,
        image: "https://via.placeholder.com/400x300",
        title: "Admission Open for 2025-26 Academic Year",
        category: "Announcement",
        tag: "Admissions",
        date: "Dec 15, 2024"
    }
];


const EditNewsPost = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // -- STATE --
    // Use passed state or fallback
    const article = location.state || {
        title: "ASRAM Medical College Receives NAAC A+ Accreditation for Excellence in Medical Education",
        image: "https://via.placeholder.com/1200x600", // Placeholder if missing
        date: "December 5, 2024",
        tag: "Achievement",
        tags: ["Achievement", "Medical College"],
        status: 'Draft'
    };

    // Ensure tags exist if they weren't in the passed state
    if (!article.tags) article.tags = [article.tag || "General"];


    return (
        <div className="flex flex-col w-full min-h-screen bg-white">




            {/* ==================== HERO IMAGE (Banner) ==================== */}
            <div className="w-full h-[300px] md:h-[640px] overflow-hidden relative">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20"></div>
            </div>


            {/* ==================== ACTIONS TOOLBAR ==================== */}
            <div className=" z-30 toolbar-spacing global-page-spacing">
                <div className="w-full py-4">
                    <div className="flex items-center justify-between gap-5 w-full">
                        <button className="flex-1 h-[48px] rounded-md bg-[#E2E8F0] text-[#475569] font-medium hover:bg-[#CBD5E1]">
                            Draft
                        </button>
                        <button className="flex-1 h-[48px] rounded-md bg-[#FEF3C7] text-[#92400E] font-medium hover:bg-[#FDE68A] ">
                            Edit
                        </button>
                        <button className="flex-1 h-[48px] rounded-md bg-[#DCFCE7] text-[#166534] font-medium hover:bg-[#BBF7D0]">
                            Publish
                        </button>
                    </div>
                </div>
            </div>


            {/* ==================== BACK TO NEWS & BREADCRUMBS ==================== */}
            <div className="news-section-spacing global-page-spacing">
                <div
                    className="flex items-center gap-2 cursor-pointer w-fit text-asram-primary hover:opacity-80 transition-opacity"
                    onClick={() => navigate('/dashboard')}
                >
                    <IconBack />
                    <span className="font-['Montserrat'] text-[20px] font-medium">
                        Back to News
                    </span>
                </div>

                <div className="mt-2 font-['Montserrat'] text-[14px] text-asram-gray">
                    <span>Home</span>
                    <span className="mx-2">/</span>
                    <span>News</span>
                    <span className="mx-2">/</span>
                    <span className="text-asram-primary">{article.tag || 'Achievement'}</span>
                </div>
            </div>


            {/* ==================== ARTICLE HEADER ==================== */}
            <div className="article-header-layout global-page-spacing">
                <div className="news-card-container">
                    {/* Tags */}
                    <div className="flex items-center gap-3">
                        <span className="tag-base tag-primary">
                            {article.tag || 'Achievement'}
                        </span>
                        <span className="tag-base tag-secondary">
                            Medical College
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="news-title">
                        {article.title}
                    </h1>

                    {/* Meta Data */}
                    <div className="flex items-center justify-between w-full mt-2 meta-data-row">
                        <div className="flex items-center gap-6 text-[#4a5565] text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <IconCalendar size={18} />
                                <span>{article.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <IconClock size={18} />
                                <span>5 min read</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="share-label">Share:</span>
                            <button  onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: article.title,
                                            url: window.location.href,
                                        });
                                    } else {
                                        navigator.clipboard.writeText(window.location.href);
                                        alert("Link copied to clipboard!");
                                    }
                                }} className="share-btn">
                                <IconShare size={16} />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 mt-2">
                        <img src={DoctorImg} alt="Dr. Rajesh Kumar" className="w-[54px] h-[54px] rounded-full object-cover border border-gray-100" />
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2 font-bold text-[#1e293b] text-[16px]">
                                <IconUser size={16} className="text-[#64748b]" />
                                <span className="text-[#64748b]">Dr. Rajesh Kumar</span>
                            </div>
                            <span className="text-[#64748b] text-[14px]">Director of Communications</span>
                        </div>
                    </div>
                </div>
            </div>



            {/* ==================== ARTICLE CONTENT ==================== */}
            <div className="article-content-layout global-page-spacing">
                <div className="news-card-container">

                    <p className="article-text">
                        ASRAM Medical College has achieved a significant milestone by securing the prestigious NAAC A+ accreditation, recognizing its commitment to excellence in medical education and research. This achievement places ASRAM among the top medical institutions in the country.
                    </p>

                    <h2 className="article-subheading">
                        A Testament to Quality Education
                    </h2>
                    <p className="article-text">
                        The National Assessment and Accreditation Council (NAAC) conducted a comprehensive evaluation of our institution over a period of six months. The assessment covered various parameters including curriculum design, faculty qualifications, research output, infrastructure facilities, student support services, and governance practices.
                    </p>
                    <p className="article-text">
                        Dr. Priya Sharma, Principal of ASRAM Medical College, expressed her pride: "This accreditation is a reflection of the hard work and dedication of our entire academic community. It validates our commitment to providing world-class medical education and producing competent healthcare professionals."
                    </p>

                    <div className="article-blockquote">
                        <p className="quote-text">
                            “This achievement is not just a recognition of our past efforts, but a commitment to continuously improve and set new benchmarks in medical education.”
                        </p>
                        <span className="quote-author">
                            - Dr. Priya Sharma, Principal
                        </span>
                    </div>

                    <h2 className="article-subheading">
                        Key Areas of Excellence
                    </h2>
                    <p className="article-text">
                        The NAAC assessment team particularly commended ASRAM Medical College for its innovative teaching methodologies, state-of-the-art simulation labs, robust research programs, and strong clinical training partnerships with leading hospitals.
                    </p>

                    <h2 className="article-subheading">
                        Impact on Future Medical Education
                    </h2>
                    <p className="article-text">
                        This accreditation will significantly enhance ASRAM Medical College's reputation and attract top faculty and students. It also opens doors for international collaborations and exchange programs with renowned medical institutions worldwide.
                    </p>
                    <p className="article-text">
                        The college administration has announced plans to further strengthen its infrastructure and academic programs, with a focus on emerging areas such as telemedicine, artificial intelligence in healthcare, and personalized medicine.
                    </p>
                    <p className="article-text">
                        For prospective students and parents, the NAAC A+ accreditation serves as a strong indicator of the quality of education and the career prospects available to graduates of ASRAM Medical College.
                    </p>

                    {/* Tags Row */}
                    <div className="article-tags-row">
                        <div className="tag-label">
                            <IconShare size={16} className="rotate-90" /> {/* Using share icon rotated as tag icon placeholder if needed, or just text */}
                            <span>Tags:</span>
                        </div>
                        <span className="tag-pill">Accreditation</span>
                        <span className="tag-pill">Medical Education</span>
                        <span className="tag-pill">NAAC</span>
                        <span className="tag-pill">Excellence</span>
                    </div>

                </div>
            </div>

            {/* ==================== DELETE ACTION ==================== */}
            <div className="global-page-spacing" style={{ marginTop: '-40px', marginBottom: '80px' }}>
                <button className="delete-action-btn">
                    Delete
                </button>
            </div>

        </div>
    );
};

export default EditNewsPost;
