import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
const IconEdit = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

// -- HELPER: Editable Element --
const EditableElement = ({
    as: Tag = 'div',
    value,
    onSave,
    isEditMode,
    className = '',
    iconSize = 16,
    multiline = false,
    iconPos = 'absolute -right-6 top-0',
    richText = false,
    richTextClass = 'rich-text-content'
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);

    React.useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !multiline) {
            handleSave();
        }
    };

    const handleSave = () => {
        setIsEditing(false);
        if (localValue !== value) {
            onSave(localValue);
        }
    };

    if (isEditing) {
        if (richText) {
            return (
                <div className={`w-full ${className}`}>
                    <CKEditor
                        editor={ClassicEditor}
                        data={localValue}
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            editor.editing.view.focus();
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setLocalValue(data);
                        }}
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSave();
                            }}
                            className="ck-editor-done-btn"
                        >
                            Done
                        </button>
                    </div>
                </div>
            );
        }

        return multiline ? (
            <textarea
                autoFocus
                className={`w-full p-2 border border-blue-400 rounded-md outline-none bg-blue-50/50 resize-y font-['Montserrat'] ${className} text-[15px]`}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={handleSave}
                style={{ minHeight: '100px' }}
            />
        ) : (
            <input
                autoFocus
                className={`w-full p-1 border-b-2 border-blue-400 outline-none bg-blue-50/50 font-['Montserrat'] ${className}`}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
            />
        );
    }

    return (
        <Tag className={`${className} relative group cursor-text`} onClick={() => isEditMode && setIsEditing(true)}>
            {richText ? <div className={richTextClass} dangerouslySetInnerHTML={{ __html: value }} /> : value}
            {isEditMode && (
                <span
                    className={`${iconPos} flex items-center justify-center p-1 cursor-pointer text-asram-primary/60 hover:text-asram-primary transition-colors z-10`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true);
                    }}
                >
                    <IconEdit size={iconSize} />
                </span>
            )}
        </Tag>
    );
};

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
    const [showToast, setShowToast] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Toggle Edit Mode
    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };
    const location = useLocation();
    const navigate = useNavigate();

    // -- STATE --
    // Extract hardcoded content to state for editing
    const [formData, setFormData] = useState({
        title: location.state?.title || "ASRAM Medical College Receives NAAC A+ Accreditation for Excellence in Medical Education",
        date: location.state?.date || "December 5, 2024",
        readTime: "5 min read",
        authorName: "Dr. Rajesh Kumar",
        authorRole: "Director of Communications",
        content: {
            intro: "ASRAM Medical College has achieved a significant milestone by securing the prestigious NAAC A+ accreditation, recognizing its commitment to excellence in medical education and research. This achievement places ASRAM among the top medical institutions in the country.",
            heading1: "A Testament to Quality Education",
            body1: "The National Assessment and Accreditation Council (NAAC) conducted a comprehensive evaluation of our institution over a period of six months. The assessment covered various parameters including curriculum design, faculty qualifications, research output, infrastructure facilities, student support services, and governance practices.",
            body2: "Dr. Priya Sharma, Principal of ASRAM Medical College, expressed her pride: \"This accreditation is a reflection of the hard work and dedication of our entire academic community. It validates our commitment to providing world-class medical education and producing competent healthcare professionals.\"",
            quote: "“This achievement is not just a recognition of our past efforts, but a commitment to continuously improve and set new benchmarks in medical education.”",
            quoteAuthor: "- Dr. Priya Sharma, Principal",
            heading2: "Key Areas of Excellence",
            body3: "The NAAC assessment team particularly commended ASRAM Medical College for its innovative teaching methodologies, state-of-the-art simulation labs, robust research programs, and strong clinical training partnerships with leading hospitals.",
            heading3: "Impact on Future Medical Education",
            body4: "This accreditation will significantly enhance ASRAM Medical College's reputation and attract top faculty and students. It also opens doors for international collaborations and exchange programs with renowned medical institutions worldwide.",
            body5: "The college administration has announced plans to further strengthen its infrastructure and academic programs, with a focus on emerging areas such as telemedicine, artificial intelligence in healthcare, and personalized medicine.",
            body6: "For prospective students and parents, the NAAC A+ accreditation serves as a strong indicator of the quality of education and the career prospects available to graduates of ASRAM Medical College."
        },
        tags: location.state?.tags || ["Achievement", "Medical College"],
        tagPills: ["Accreditation", "Medical Education", "NAAC", "Excellence"]
    });

    // Helper to update form data
    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateContent = (key, value) => {
        setFormData(prev => ({
            ...prev,
            content: { ...prev.content, [key]: value }
        }));
    };

    const article = {
        image: location.state?.image || "https://via.placeholder.com/1200x600",
        tag: location.state?.tag || "Achievement",
        ...formData
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
                        <button
                            onClick={toggleEditMode}
                            className={`flex-1 h-[48px] rounded-md font-medium transition-colors ${isEditMode ? 'bg-[#FDE68A] text-[#92400E] ring-2 ring-[#F59E0B]' : 'bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A]'}`}
                        >
                            {isEditMode ? 'Editing...' : 'Edit'}
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
                    {/* Title */}
                    <EditableElement
                        as="h1"
                        value={formData.title}
                        onSave={(val) => updateField('title', val)}
                        isEditMode={isEditMode}
                        className="news-title flex items-start gap-2"
                        iconSize={24}
                        multiline={true}
                        richText={true}
                        richTextClass="rich-text-transparent"
                        iconPos="relative p-1"
                    />

                    {/* Meta Data */}
                    <div className="flex items-center justify-between w-full mt-2 meta-data-row">
                        <div className="flex items-center gap-6 text-[#4a5565] text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <IconCalendar size={18} />
                                <EditableElement
                                    as="span"
                                    value={formData.date}
                                    onSave={(val) => updateField('date', val)}
                                    isEditMode={isEditMode}
                                    iconPos="relative p-1"
                                    iconSize={14}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <IconClock size={18} />
                                <EditableElement
                                    as="span"
                                    value={formData.readTime}
                                    onSave={(val) => updateField('readTime', val)}
                                    isEditMode={isEditMode}
                                    iconPos="relative p-1"
                                    iconSize={14}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="share-label">Share:</span>
                            <button onClick={() => {
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
                                <EditableElement
                                    as="span"
                                    value={formData.authorName}
                                    onSave={(val) => updateField('authorName', val)}
                                    isEditMode={isEditMode}
                                    className="text-[#64748b]"
                                    iconPos="relative p-1"
                                    iconSize={14}
                                />
                            </div>
                            <EditableElement
                                as="span"
                                value={formData.authorRole}
                                onSave={(val) => updateField('authorRole', val)}
                                isEditMode={isEditMode}
                                className="text-[#64748b] text-[14px]"
                                iconPos="relative p-1"
                                iconSize={12}
                            />
                        </div>
                    </div>
                </div>
            </div>



            {/* ==================== ARTICLE CONTENT ==================== */}
            <div className="article-content-layout global-page-spacing">
                <div className="news-card-container">

                    <EditableElement
                        as="p"
                        value={formData.content.intro}
                        onSave={(val) => updateContent('intro', val)}
                        isEditMode={isEditMode}
                        multiline={true}
                        richText={true}
                        className="article-text"
                    />

                    <EditableElement
                        as="h2"
                        value={formData.content.heading1}
                        onSave={(val) => updateContent('heading1', val)}
                        isEditMode={isEditMode}
                        className="article-subheading flex items-center gap-2"
                        iconPos="relative p-1"
                        iconSize={20}
                    />

                    <EditableElement
                        as="p"
                        value={formData.content.body1}
                        onSave={(val) => updateContent('body1', val)}
                        isEditMode={isEditMode}
                        multiline={true}
                        richText={true}
                        className="article-text"
                    />

                    <EditableElement
                        as="p"
                        value={formData.content.body2}
                        onSave={(val) => updateContent('body2', val)}
                        isEditMode={isEditMode}
                        multiline={true}
                        richText={true}
                        className="article-text"
                    />

                    <div className="article-blockquote relative group">
                        <EditableElement
                            as="p"
                            value={formData.content.quote}
                            onSave={(val) => updateContent('quote', val)}
                            isEditMode={isEditMode}
                            multiline={true}
                            richText={true}
                            className="quote-text"
                            iconPos="absolute right-0 top-0 p-1"
                        />
                        <EditableElement
                            as="span"
                            value={formData.content.quoteAuthor}
                            onSave={(val) => updateContent('quoteAuthor', val)}
                            isEditMode={isEditMode}
                            className="quote-author"
                        />
                    </div>

                    <EditableElement
                        as="h2"
                        value={formData.content.heading2}
                        onSave={(val) => updateContent('heading2', val)}
                        isEditMode={isEditMode}
                        className="article-subheading flex items-center gap-2"
                        iconPos="relative p-1"
                        richText={true}
                        richTextClass="rich-text-transparent"
                        iconSize={20}
                    />

                    <EditableElement
                        as="p"
                        value={formData.content.body3}
                        onSave={(val) => updateContent('body3', val)}
                        isEditMode={isEditMode}
                        multiline={true}
                        richText={true}
                        className="article-text"
                    />

                    <EditableElement
                        as="h2"
                        value={formData.content.heading3}
                        onSave={(val) => updateContent('heading3', val)}
                        isEditMode={isEditMode}
                        className="article-subheading flex items-center gap-2"
                        iconPos="relative p-1"
                        richText={true}
                        richTextClass="rich-text-transparent"
                        iconSize={20}
                    />

                    <EditableElement
                        as="p"
                        value={formData.content.body4}
                        onSave={(val) => updateContent('body4', val)}
                        isEditMode={isEditMode}
                        multiline={true}
                        richText={true}
                        className="article-text"
                    />

                    <EditableElement
                        as="p"
                        value={formData.content.body5}
                        onSave={(val) => updateContent('body5', val)}
                        isEditMode={isEditMode}
                        multiline={true}
                        richText={true}
                        className="article-text"
                    />

                    <EditableElement
                        as="p"
                        value={formData.content.body6}
                        onSave={(val) => updateContent('body6', val)}
                        isEditMode={isEditMode}
                        multiline={true}
                        richText={true}
                        className="article-text"
                    />

                    {/* Tags Row */}
                    {/* Tags Row */}
                    <div className="article-tags-row">
                        <div className="tag-label">
                            <IconShare size={16} className="rotate-90" />
                            <span>Tags:</span>
                        </div>
                        {formData.tagPills.map((tag, index) => (
                            <EditableElement
                                key={index}
                                as="span"
                                value={tag}
                                onSave={(val) => {
                                    const newTags = [...formData.tagPills];
                                    newTags[index] = val;
                                    updateField('tagPills', newTags);
                                }}
                                isEditMode={isEditMode}
                                className="tag-pill pr-6"
                                iconPos="absolute right-1 top-1/2 -translate-y-1/2 p-0.5"
                                iconSize={10}
                            />
                        ))}
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
