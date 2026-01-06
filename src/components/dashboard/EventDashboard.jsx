import React, { useState, useRef, useEffect } from 'react';
import TimePicker from './TimePicker';

const EventDashboard = () => {
    // State
    const [college, setCollege] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isTimeFocused, setIsTimeFocused] = useState(false); // Add focus state for time input visibility
    const [heading, setHeading] = useState('');

    // Overview Section
    const [overviewSummary, setOverviewSummary] = useState('');
    const [overviewImage, setOverviewImage] = useState(null);
    const [overviewImagePreview, setOverviewImagePreview] = useState(null);

    // About Section
    const [aboutDescription, setAboutDescription] = useState('');
    const [aboutImage, setAboutImage] = useState(null);
    const [aboutImagePreview, setAboutImagePreview] = useState(null);

    // Venue Section
    const [venueAddress, setVenueAddress] = useState('');
    const [venueLocationImage, setVenueLocationImage] = useState(null); // Assuming image upload for location as per design placeholder
    const [venueLocationPreview, setVenueLocationPreview] = useState(null);

    const [venueFileRef2, setVenueFileRef2] = useState(null); // Just a placeholder if needed, usually we reuse ref or create new one

    // Speakers Section
    const [speakers, setSpeakers] = useState([]); // Array of speaker objects
    const [activeSpeakerIndex, setActiveSpeakerIndex] = useState(null); // To edit a specific speaker if needed

    // Gallery Section
    const [galleryImages, setGalleryImages] = useState([]); // Array of gallery image objects

    // Registration Section
    const [regStartDate, setRegStartDate] = useState('');
    const [regEndDate, setRegEndDate] = useState('');
    const [regAmount, setRegAmount] = useState('');
    const [regIncluded, setRegIncluded] = useState('');
    const [regExternalLink, setRegExternalLink] = useState('');

    // Toggles
    const [showSpeakers, setShowSpeakers] = useState(true); // Renamed from isSpeakersEnabled to match usage
    const [isRegistrationEnabled, setIsRegistrationEnabled] = useState(false);
    const [isGalleryEnabled, setIsGalleryEnabled] = useState(true); // Default to true or per requirements

    // File Refs
    const overviewFileRef = useRef(null);
    const aboutFileRef = useRef(null);
    const venueFileRef = useRef(null);

    // Generic Image Handler
    const handleImageUpload = (e, setFile, setPreview) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Speakers Handler
    const handleAddSpeaker = () => {
        setSpeakers([...speakers, { id: Date.now(), name: '', role: '', image: null, imagePreview: null }]);
    };

    const handleDeleteSpeaker = (id) => {
        setSpeakers(speakers.filter(speaker => speaker.id !== id));
    };

    const handleSpeakerChange = (id, field, value) => {
        setSpeakers(speakers.map(speaker =>
            speaker.id === id ? { ...speaker, [field]: value } : speaker
        ));
    };

    const handleSpeakerImageUpload = (e, id) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setSpeakers(speakers.map(speaker =>
                speaker.id === id ? { ...speaker, image: file, imagePreview: previewUrl } : speaker
            ));
        }
    };

    // Gallery Handler
    const handleAddGalleryImage = () => {
        setGalleryImages([...galleryImages, { id: Date.now(), image: null, imagePreview: null }]);
    };

    const handleDeleteGalleryImage = (id) => {
        setGalleryImages(galleryImages.filter(img => img.id !== id));
    };

    const handleGalleryImageUpload = (e, id) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setGalleryImages(galleryImages.map(img =>
                img.id === id ? { ...img, image: file, imagePreview: previewUrl } : img
            ));
        }
    };

    // Styling Constants
    const sectionTitleStyle = {
        fontFamily: 'Montserrat',
        fontSize: '18px', // Updated from Figma (20px)
        fontWeight: '400', // Updated to normal (400) from Figma screenshot
        color: '#191919BF',
        marginBottom: '20px'
    };

    const cardStyle = {
        backgroundColor: '#fff',
        borderRadius: '9px',
        border: '1px solid rgba(7, 7, 7, 0.2)',
        padding: '20px',
        height: '100%',
        minHeight: '280px', // Consistent height for grid items
        display: 'flex',
        flexDirection: 'column'
    };

    const inputStyle = {
        width: '100%',
        height: '48px',
        padding: '0 20px',
        borderRadius: '9px',
        border: '1px solid rgba(7, 7, 7, 0.2)',
        fontSize: '16px',
        fontFamily: 'Montserrat',
        outline: 'none',
        color: '#333'
    };

    const textAreaStyle = {
        width: '100%',
        height: '100%',
        padding: '20px',
        borderRadius: '9px',
        border: 'none',
        fontSize: '16px',
        fontFamily: 'Montserrat',
        resize: 'none',
        outline: 'none',
        color: 'rgba(25, 25, 25, 0.75)'
    };

    const uploadBoxStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: '1px solid rgba(7, 7, 7, 0.2)',
        borderRadius: '9px',
        backgroundColor: '#fff',
        position: 'relative',
        overflow: 'hidden'
    };

    const deleteButtonStyle = {
        width: '157px',
        height: '36px',
        padding: '8px 24px',
        borderRadius: '9px',
        border: '1px solid rgba(7, 7, 7, 0.2)',
        backgroundColor: 'rgba(192, 57, 43, 0.1)',
        color: 'rgba(25, 25, 25, 0.75)',
        fontSize: '18px',
        fontWeight: '400',
        fontFamily: 'Montserrat',
        lineHeight: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const handleSubmit = () => {
        // Helper to get file metadata
        const getFileMeta = (file) => file ? { name: file.name, size: file.size, type: file.type } : null;

        const payload = {
            college,
            date,
            time,
            heading,
            overview: {
                summary: overviewSummary,
                image: getFileMeta(overviewImage)
            },
            about: {
                description: aboutDescription,
                image: getFileMeta(aboutImage)
            },
            venue: {
                address: venueAddress,
                image: getFileMeta(venueLocationImage)
            },
            speakers: showSpeakers ? speakers.map(s => ({
                id: s.id,
                name: s.name,
                role: s.role,
                image: getFileMeta(s.image)
            })) : [],
            registration: isRegistrationEnabled ? {
                startDate: regStartDate,
                endDate: regEndDate,
                amount: regAmount,
                included: regIncluded,
                externalLink: regExternalLink
            } : null,
            gallery: isGalleryEnabled ? galleryImages.map(img => ({
                id: img.id,
                image: getFileMeta(img.image)
            })) : []
        };

        console.log("Form Payload:", JSON.stringify(payload, null, 2));
        alert("Form data logged to console! (Check F12)");
    };

    return (
        <div className="flex flex-col w-full h-full font-['Montserrat'] bg-white pb-10 gap-y-[20px]"
            style={{ padding: '24px clamp(16px, 4vw, 48px) 40px' }}>

            {/* Styles to hide native picker indicators but keep functionality if possible, or just hide them to use custom icon visually */}
            <style>{`
                input[type="date"]::-webkit-calendar-picker-indicator,
                input[type="time"]::-webkit-calendar-picker-indicator {
                    cursor: pointer;
                    opacity: 0;
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
            `}</style>

            {/* --- Header & Top Inputs Wrapper --- */}
            <div className="flex flex-col w-full gap-y-[20px]">
                {/* --- Header --- */}
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row items-baseline gap-3">
                        <h5 className="font-semibold text-[#223f7f] text-[24px]">Events Section</h5>
                        <span className="text-[14px] leading-[20px] text-[#191919BF]">This content will appear on the ASRAM website</span>
                    </div>
                    <button className="hover:bg-red-100 transition-colors cursor-pointer" style={deleteButtonStyle}>
                        Delete
                    </button>
                </div>

                {/* --- Top Inputs Row --- */}
                <div className="flex flex-col md:flex-row w-full gap-[12px]">
                    {/* College Select */}
                    <div className="relative flex-1">
                        <select
                            value={college}
                            onChange={(e) => setCollege(e.target.value)}
                            style={inputStyle}
                            className="appearance-none cursor-pointer bg-white w-full"
                        >
                            <option value="">Select College</option>
                            <option value="Medical">Medical College</option>
                            <option value="Nursing">Nursing College</option>
                            <option value="Paramedical">Paramedical College</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor"><path d="M1 1.5L6 6.5L11 1.5" strokeWidth="1.5" /></svg>
                        </div>
                    </div>

                    {/* Date Picker */}
                    <div className="relative flex-1" onClick={() => document.getElementById('date-input').showPicker()}>
                        <input
                            id="date-input"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{ ...inputStyle, padding: '12px 20px', height: '48px', color: date ? '#333' : 'transparent' }}
                            className="cursor-pointer w-full relative z-10 bg-transparent"
                        />
                        {!date && (
                            <span className="absolute left-[20px] top-1/2 -translate-y-1/2 text-[#333] pointer-events-none z-0">
                                Date
                            </span>
                        )}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-0">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 2V6" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 2V6" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 10H21" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Time Picker */}
                    <TimePicker value={time} onChange={setTime} />
                </div>
            </div>

            {/* --- Event Heading --- */}
            <div>
                <textarea
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    placeholder="Event Heading"
                    className="resize-none"
                    style={{
                        ...inputStyle,
                        height: '91px',
                        fontSize: '18px',
                        padding: '12px 20px',
                        display: 'flex',
                        alignItems: 'flex-start'
                    }}
                />
            </div>

            {/* --- Event Overview Section --- */}
            <div>
                <h3 style={sectionTitleStyle}>Event Overview</h3>
                {/* Explicitly setting styles to ensure updates reflect - FORCE UPDATE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]" style={{ height: '292px' }}>
                    {/* Summary Text */}
                    <div style={{
                        backgroundColor: '#fff',
                        border: '1px solid rgba(7, 7, 7, 0.2)',
                        padding: '14px 22px', // Updated from Figma: py-[14px] px-[22px]
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        minHeight: 0
                    }}>
                        <textarea
                            value={overviewSummary}
                            onChange={(e) => setOverviewSummary(e.target.value)}
                            placeholder="Short summary"
                            style={{
                                width: '100%',
                                fontSize: '16px',
                                fontFamily: 'Montserrat',
                                resize: 'none',
                                outline: 'none',
                                border: 'none',
                                height: 'auto',
                                textAlign: 'center',
                                padding: 0,
                                margin: 0,
                                color: 'rgba(25, 25, 25, 0.75)'
                            }}
                            className="bg-transparent"
                        />
                    </div>
                    {/* Overview Image */}
                    <div onClick={() => overviewFileRef.current.click()}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start', // Updated from Figma
                            cursor: 'pointer',
                            border: '1px solid rgba(7, 7, 7, 0.2)',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            position: 'relative',
                            overflow: 'hidden',
                            minHeight: 0,
                            padding: '74px 65px', // Updated from Figma
                            gap: '20px' // Updated from Figma
                        }}
                        className="group hover:bg-gray-50 transition-colors">
                        {overviewImagePreview ? (
                            <img src={overviewImagePreview} alt="Overview" className="w-full h-full object-cover rounded-[8px]" />
                        ) : (
                            <>
                                <div style={{
                                    width: '62px', // Updated from Figma (61.6px)
                                    height: '62px',
                                    borderRadius: '10px', // Updated from Figma (10.3px)
                                    border: '1px solid #d3d3d3',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="2"><path d="M12 5V19M5 12H19" /></svg>
                                </div>
                                <span style={{
                                    fontFamily: 'Montserrat',
                                    fontSize: '18px',
                                    fontWeight: '400',
                                    color: 'rgba(25, 25, 25, 0.75)',
                                    lineHeight: '1.11',
                                    textAlign: 'center'
                                }}>Upload Overview Image</span>
                                <span className="text-gray-400 text-sm" style={{ textAlign: 'center' }}>Recommended size (e.g. 600× 380)</span>
                            </>
                        )}
                        <input type="file" ref={overviewFileRef} onChange={(e) => handleImageUpload(e, setOverviewImage, setOverviewImagePreview)} hidden accept="image/*" />
                    </div>
                </div>
            </div>

            {/* --- About Event Section --- */}
            <div>
                <h3 style={sectionTitleStyle}>About Event</h3>
                {/* Explicitly setting styles to ensure updates reflect - FORCE UPDATE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]" style={{ height: '292px' }}>
                    {/* About Image (Left) */}
                    <div onClick={() => aboutFileRef.current.click()}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            cursor: 'pointer',
                            border: '1px solid rgba(7, 7, 7, 0.2)',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            position: 'relative',
                            overflow: 'hidden',
                            minHeight: 0,
                            padding: '74px 65px',
                            gap: '20px'
                        }}
                        className="group hover:bg-gray-50 transition-colors">
                        {aboutImagePreview ? (
                            <img src={aboutImagePreview} alt="About" className="w-full h-full object-cover rounded-[8px]" />
                        ) : (
                            <>
                                <div style={{
                                    width: '62px',
                                    height: '62px',
                                    borderRadius: '10px',
                                    border: '1px solid #d3d3d3',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="2"><path d="M12 5V19M5 12H19" /></svg>
                                </div>
                                <span style={{
                                    fontFamily: 'Montserrat',
                                    fontSize: '18px',
                                    fontWeight: '400',
                                    color: 'rgba(25, 25, 25, 0.75)',
                                    lineHeight: '1.11',
                                    textAlign: 'center'
                                }}>Upload About Event</span>
                                <span className="text-gray-400 text-sm" style={{ textAlign: 'center' }}>Recommended size (e.g. 600× 380)</span>
                            </>
                        )}
                        <input type="file" ref={aboutFileRef} onChange={(e) => handleImageUpload(e, setAboutImage, setAboutImagePreview)} hidden accept="image/*" />
                    </div>

                    {/* Detailed Description (Right) */}
                    <div style={{
                        backgroundColor: '#fff',
                        border: '1px solid rgba(7, 7, 7, 0.2)',
                        padding: '14px 22px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        minHeight: 0
                    }}>
                        <textarea
                            value={aboutDescription}
                            onChange={(e) => setAboutDescription(e.target.value)}
                            placeholder="Detailed description"
                            style={{
                                width: '100%',
                                fontSize: '16px',
                                fontFamily: 'Montserrat',
                                resize: 'none',
                                outline: 'none',
                                border: 'none',
                                height: 'auto',
                                textAlign: 'center',
                                padding: 0,
                                margin: 0,
                                color: 'rgba(25, 25, 25, 0.75)'
                            }}
                            className="bg-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* --- Venue & Location Section --- */}
            <div>
                <h3 style={sectionTitleStyle}>Venue & Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]" style={{ height: '292px' }}>
                    {/* Main Location (Left) */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#fff',
                        border: '1px solid rgba(7, 7, 7, 0.2)',
                        borderRadius: '8px',
                        padding: '14px 22px', // Updated from Figma: py-[14px] px-[22px]
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px', // Updated from Figma
                        minHeight: 0
                    }}>
                        <div className="flex items-center gap-2 text-[#223f7f]">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span className="font-['Montserrat'] font-medium text-[16px] text-gray-400">Main Location</span>
                        </div>
                        <textarea
                            value={venueAddress}
                            onChange={(e) => setVenueAddress(e.target.value)}
                            placeholder="Enter Full Address"
                            style={{
                                width: '100%',
                                height: '100%',
                                resize: 'none',
                                outline: 'none',
                                border: '1px solid rgba(7, 7, 7, 0.2)', // Inner border from Figma
                                borderRadius: '12px', // Inner radius from Figma
                                padding: '20px', // Inner padding from Figma
                                fontFamily: 'Montserrat',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    {/* Location Image (Right) */}
                    <div onClick={() => venueFileRef.current.click()}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            cursor: 'pointer',
                            border: '1px solid rgba(7, 7, 7, 0.2)',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            position: 'relative',
                            overflow: 'hidden',
                            minHeight: 0,
                            padding: '74px 65px',
                            gap: '20px'
                        }}
                        className="group hover:bg-gray-50 transition-colors">
                        {venueLocationPreview ? (
                            <img src={venueLocationPreview} alt="Venue" className="w-full h-full object-cover rounded-[8px]" />
                        ) : (
                            <>
                                <div style={{
                                    width: '62px',
                                    height: '62px',
                                    borderRadius: '10px',
                                    border: '1px solid #d3d3d3',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="2"><path d="M12 5V19M5 12H19" /></svg>
                                </div>
                                <span style={{
                                    fontFamily: 'Montserrat',
                                    fontSize: '18px',
                                    fontWeight: '400',
                                    color: 'rgba(25, 25, 25, 0.75)',
                                    lineHeight: '1.11',
                                    textAlign: 'center'
                                }}>Upload Location Image</span>
                                <span className="text-gray-400 text-sm" style={{ textAlign: 'center' }}>Recommended size (e.g. 600× 380)</span>
                            </>
                        )}
                        <input type="file" ref={venueFileRef} onChange={(e) => handleImageUpload(e, setVenueLocationImage, setVenueLocationPreview)} hidden accept="image/*" />
                    </div>
                </div>
            </div>



            {/* --- Speakers Section --- */}
            <div style={{
                width: '100%',
                border: '1px solid rgba(7, 7, 7, 0.2)',
                borderRadius: '8px',
                padding: showSpeakers ? '12px 20px 45px' : '10px 20px', // Adjusted for collapsed state (matching ~44px height)
                backgroundColor: '#fff',
                transition: 'all 0.3s ease'
            }}>
                <div className="flex justify-between items-center" style={{ marginBottom: showSpeakers ? '12px' : '0' }}>
                    <h3 style={{ ...sectionTitleStyle, marginBottom: 0, lineHeight: '24px', display: 'flex', alignItems: 'center' }}>Speakers</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={showSpeakers} onChange={(e) => setShowSpeakers(e.target.checked)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#223f7f]"></div>
                    </label>
                </div>

                {showSpeakers && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[20px]" style={{ width: '100%' }}> {/* Adjusted to fit 3 cards as per Figma frame width 712px */}
                        {speakers.map((speaker) => (
                            <div key={speaker.id} style={{
                                width: '100%',
                                height: '306px', // Fixed height from Figma
                                border: '1px solid rgba(7, 7, 7, 0.2)',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative'
                            }}>
                                {/* Delete Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDeleteSpeaker(speaker.id); }}
                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50 z-10 cursor-pointer"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff4444" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                </button>

                                {/* Image Area */}
                                <div
                                    onClick={() => document.getElementById(`speaker-file-${speaker.id}`).click()}
                                    style={{ height: '230px' }} // 306px total - 76px info = 230px image
                                    className="w-full bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors relative"
                                >
                                    {speaker.imagePreview ? (
                                        <img src={speaker.imagePreview} alt="Speaker" className="w-full h-full object-cover" />
                                    ) : (
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '8px',
                                            border: '0.8px solid #d3d3d3',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#fff'
                                        }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><path d="M12 5V19M5 12H19" /></svg>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id={`speaker-file-${speaker.id}`}
                                        onChange={(e) => handleSpeakerImageUpload(e, speaker.id)}
                                        hidden
                                        accept="image/*"
                                    />
                                </div>

                                {/* Info Area (Bottom) */}
                                <div style={{
                                    height: '76px', // Fixed height from Figma
                                    backgroundColor: '#f6f8fb', // Color from Figma
                                    padding: '12px', // Padding from Figma
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    borderTop: '1px solid rgba(7,7,7,0.1)'
                                }}>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={speaker.name}
                                        onChange={(e) => handleSpeakerChange(speaker.id, 'name', e.target.value)}
                                        className="bg-transparent outline-none w-full font-['Montserrat'] text-[14px] font-medium"
                                        style={{ color: '#333' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Role"
                                        value={speaker.role}
                                        onChange={(e) => handleSpeakerChange(speaker.id, 'role', e.target.value)}
                                        className="bg-transparent outline-none w-full font-['Montserrat'] text-[12px] text-gray-500"
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Add Speaker Button */}
                        <div onClick={handleAddSpeaker} style={{
                            width: '100%',
                            height: '306px', // Fixed height from Figma
                            border: '1px solid rgba(7, 7, 7, 0.2)',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            backgroundColor: '#fff'
                        }} className="hover:bg-gray-50 transition-colors gap-[10px]">
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '8px',
                                border: '0.8px solid #d3d3d3',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff'
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><path d="M12 5V19M5 12H19" /></svg>
                            </div>
                            <span style={{
                                fontFamily: 'Montserrat',
                                fontSize: '14px',
                                color: 'rgba(25, 25, 25, 0.75)'
                            }}>Add Speaker</span>
                        </div>
                    </div>
                )}
            </div>

            {/* --- Registration Section --- */}
            <div style={{
                width: '100%',
                border: '1px solid rgba(7, 7, 7, 0.2)',
                borderRadius: '8px',
                padding: isRegistrationEnabled ? '12px 20px 20px' : '10px 20px', // Bottom 20px as per new Figma design
                backgroundColor: '#fff',
                transition: 'all 0.3s ease',
                marginBottom: '20px'
            }}>
                <div className="flex justify-between items-center" style={{ marginBottom: isRegistrationEnabled ? '12px' : '0' }}>
                    <h3 style={{ ...sectionTitleStyle, marginBottom: 0, lineHeight: '24px', display: 'flex', alignItems: 'center' }}>Registration</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isRegistrationEnabled} onChange={(e) => setIsRegistrationEnabled(e.target.checked)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#223f7f]"></div>
                    </label>
                </div>

                {isRegistrationEnabled && (
                    <div className="flex flex-col gap-[12px]">
                        {/* Row 1: Dates & Amount */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
                            {/* Start Date */}
                            <div className="relative" onClick={() => document.getElementById('reg-start-date').showPicker()}>
                                <input
                                    id="reg-start-date"
                                    type="date"
                                    value={regStartDate}
                                    onChange={(e) => setRegStartDate(e.target.value)}
                                    style={{ ...inputStyle, padding: '12px 20px', color: regStartDate ? '#333' : 'transparent' }}
                                    className="cursor-pointer w-full relative z-10 bg-transparent"
                                />
                                {!regStartDate && (
                                    <span className="absolute left-[20px] top-1/2 -translate-y-1/2 text-gray-400 font-['Montserrat'] pointer-events-none z-0">
                                        Registration Start Date
                                    </span>
                                )}
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-0">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" /><path d="M16 2V6" /><path d="M8 2V6" /><path d="M3 10H21" /></svg>
                                </div>
                            </div>

                            {/* End Date */}
                            <div className="relative" onClick={() => document.getElementById('reg-end-date').showPicker()}>
                                <input
                                    id="reg-end-date"
                                    type="date"
                                    value={regEndDate}
                                    onChange={(e) => setRegEndDate(e.target.value)}
                                    style={{ ...inputStyle, padding: '12px 20px', color: regEndDate ? '#333' : 'transparent' }}
                                    className="cursor-pointer w-full relative z-10 bg-transparent"
                                />
                                {!regEndDate && (
                                    <span className="absolute left-[20px] top-1/2 -translate-y-1/2 text-gray-400 font-['Montserrat'] pointer-events-none z-0">
                                        Registration End Date
                                    </span>
                                )}
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-0">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" /><path d="M16 2V6" /><path d="M8 2V6" /><path d="M3 10H21" /></svg>
                                </div>
                            </div>

                            {/* Amount */}
                            <input
                                type="text"
                                value={regAmount}
                                onChange={(e) => setRegAmount(e.target.value)}
                                placeholder="Registration Amount"
                                style={inputStyle}
                                className="placeholder-gray-400"
                            />
                        </div>

                        {/* Row 2: What's Included */}
                        <textarea
                            value={regIncluded}
                            onChange={(e) => setRegIncluded(e.target.value)}
                            placeholder="What's Included"
                            style={{
                                ...textAreaStyle,
                                height: '112px', // Fixed height from Figma
                                border: '1px solid rgba(7, 7, 7, 0.2)',
                                borderRadius: '9px', // From Figma
                                padding: '12px 20px'
                            }}
                            className="placeholder-gray-400"
                        />

                        {/* Row 3: External Links */}
                        <input
                            type="text"
                            value={regExternalLink}
                            onChange={(e) => setRegExternalLink(e.target.value)}
                            placeholder="Any External Links"
                            style={inputStyle}
                            className="placeholder-gray-400"
                        />
                    </div>
                )}
            </div>

            {/* --- Gallery Section --- */}
            <div style={{
                width: '100%',
                border: '1px solid rgba(7, 7, 7, 0.2)',
                borderRadius: '8px',
                padding: isGalleryEnabled ? '12px 20px 45px' : '10px 20px',
                backgroundColor: '#fff',
                transition: 'all 0.3s ease'
            }}>
                <div className="flex justify-between items-center" style={{ marginBottom: isGalleryEnabled ? '12px' : '0' }}>
                    <h3 style={{ ...sectionTitleStyle, marginBottom: 0, lineHeight: '24px', display: 'flex', alignItems: 'center' }}>Gallery</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isGalleryEnabled} onChange={(e) => setIsGalleryEnabled(e.target.checked)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#223f7f]"></div>
                    </label>
                </div>

                {isGalleryEnabled && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[10px]" style={{ width: '100%' }}>
                        {galleryImages.map((img) => (
                            <div key={img.id} style={{
                                width: '100%',
                                height: '276px', // Fixed height from Figma
                                border: '1px solid rgba(7, 7, 7, 0.2)',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative'
                            }}>
                                {/* Delete Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDeleteGalleryImage(img.id); }}
                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50 z-10 cursor-pointer"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff4444" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                </button>

                                {/* Image Area */}
                                <div
                                    onClick={() => document.getElementById(`gallery-file-${img.id}`).click()}
                                    style={{ height: '100%' }}
                                    className="w-full bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors relative"
                                >
                                    {img.imagePreview ? (
                                        <img src={img.imagePreview} alt="Gallery" className="w-full h-full object-cover" />
                                    ) : (
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '8px',
                                            border: '0.8px solid #d3d3d3',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#fff'
                                        }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><path d="M12 5V19M5 12H19" /></svg>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id={`gallery-file-${img.id}`}
                                        onChange={(e) => handleGalleryImageUpload(e, img.id)}
                                        hidden
                                        accept="image/*"
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Add Gallery Button */}
                        <div onClick={handleAddGalleryImage} style={{
                            width: '100%',
                            height: '276px', // Fixed height from Figma
                            border: '1px solid rgba(7, 7, 7, 0.2)',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            backgroundColor: '#fff'
                        }} className="hover:bg-gray-50 transition-colors gap-[10px]">
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '8px',
                                border: '0.8px solid #d3d3d3',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff'
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><path d="M12 5V19M5 12H19" /></svg>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* --- Footer Actions --- */}
            <div className="flex flex-col gap-[12px] mt-8 mb-12">
                {/* Row 1: Save, Draft, Status */}
                <div className="flex items-center">
                    {/* Save Button */}
                    <button style={{
                        width: '555px',
                        height: '44px',
                        backgroundColor: '#eef2f7',
                        border: '1px solid rgba(7, 7, 7, 0.2)',
                        borderRadius: '8px',
                        fontFamily: 'Montserrat',
                        fontSize: '18px',
                        fontWeight: '500',
                        color: '#6b6b6b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px',
                        cursor: 'pointer'
                    }}>
                        Save
                    </button>

                    {/* Draft Button */}
                    <button style={{
                        width: '271px',
                        height: '44px',
                        backgroundColor: '#eef2f7',
                        border: '1px solid rgba(7, 7, 7, 0.2)',
                        borderRadius: '9px', // Per Figma screenshot
                        fontFamily: 'Montserrat',
                        fontSize: '18px',
                        fontWeight: '500',
                        color: '#6b6b6b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '59.5px', // Exact spacing from Figma
                        cursor: 'pointer'
                    }}>
                        Draft
                    </button>

                    {/* Status Text */}
                    <span style={{
                        fontFamily: 'Montserrat',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: 'rgba(25, 25, 25, 0.75)',
                        whiteSpace: 'nowrap'
                    }}>
                        Changes not saved
                    </span>
                </div>

                {/* Row 2: Submit Button */}
                <button
                    onClick={handleSubmit}
                    style={{
                        width: '100%',
                        height: '44px',
                        backgroundColor: '#223f7f',
                        border: 'none',
                        borderRadius: '8px',
                        fontFamily: 'Montserrat',
                        fontSize: '18px',
                        fontWeight: '500',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}>
                    Submit
                </button>
            </div>
            {/* Explicit Spacer for bottom scrolling - 50px */}
            <div style={{ height: '20px', width: '100%', flexShrink: 0 }}></div>
        </div>
    );
};

export default EventDashboard;
