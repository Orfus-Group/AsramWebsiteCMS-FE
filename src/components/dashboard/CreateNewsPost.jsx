import React, { useState } from 'react';

const CreateNewsPost = () => {
    // State for form fields
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [college, setCollege] = useState('');
    const [category, setCategory] = useState('');
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [validationError, setValidationError] = useState('');
    const [errors, setErrors] = useState({});

    const fileInputRef = React.useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Reset states
            setValidationError('');
            setBannerImage(null);
            setBannerPreview(null);
            setErrors({});

            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                const width = img.naturalWidth || img.width;
                const height = img.naturalHeight || img.height;
                const aspectRatio = width / height;

                console.log(`Image Upload Debug: ${width}x${height}, Ratio: ${aspectRatio.toFixed(3)}`);

                // Validation Rules
                // 1. Minimum Width: 600px
                if (width < 600) {
                    setValidationError(`Image is too small (${width}px wide). Minimum width is 600px.`);
                    URL.revokeObjectURL(img.src);
                    return;
                }

                // 2. Aspect Ratio: Approx 2:1 (Extended range 1.5 - 2.5)
                if (aspectRatio < 1.5 || aspectRatio > 2.5) {
                    setValidationError(`Invalid aspect ratio ${aspectRatio.toFixed(2)} (${width}x${height}). Expected ~2:1 Landscape.`);
                    URL.revokeObjectURL(img.src);
                    return;
                }

                // Valid
                setBannerImage(file);
                setBannerPreview(img.src);
            };

            img.onerror = () => {
                setValidationError('Invalid image file. Could not load dimensions.');
            };
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async () => {
        const newErrors = {};

        // 1. Validation
        if (!title.trim()) newErrors.title = 'Title is required';
        if (!content.trim()) newErrors.content = 'Content is required';
        if (!college) newErrors.college = 'College selection is required';
        if (!category) newErrors.category = 'Category selection is required';
        if (!bannerImage) newErrors.bannerImage = 'Banner image is required';
        if (validationError) newErrors.bannerImage = validationError;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Clear errors if valid
        setErrors({});

        // 2. Construct Payload
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('college', college);
        formData.append('category', category);
        formData.append('bannerImage', bannerImage); // File object

        // 3. Log Payload (Simulation)
        console.group('Submitting News Post Payload');
        console.log('Text Fields:', {
            title,
            content,
            college,
            category
        });
        console.log('File:', bannerImage);

        // Log FormData entries to verify internal structure
        const payloadObject = {};
        formData.forEach((value, key) => {
            // For file, we just show name/type for clarity in generic log
            if (value instanceof File) {
                payloadObject[key] = { name: value.name, type: value.type, size: value.size };
            } else {
                payloadObject[key] = value;
            }
        });
        console.log('FormData Content:', payloadObject);
        console.groupEnd();

        alert('Payload prepared and logged to console. Ready for API integration.');
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to clear the form? This action cannot be undone.')) {
            setTitle('');
            setContent('');
            setCollege('');
            setCategory('');
            setBannerImage(null);
            setBannerPreview(null);
            setValidationError('');
            setErrors({});
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleDraft = () => {
        // Construct payload (allowing partial data for drafts)
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('college', college);
        formData.append('category', category);
        if (bannerImage) {
            formData.append('bannerImage', bannerImage);
        }

        console.group('Saving Draft Payload');
        console.log('Text Fields:', { title, content, college, category });
        console.log('File:', bannerImage);
        // Log FormData entries
        const payloadObject = {};
        formData.forEach((value, key) => {
            if (value instanceof File) {
                payloadObject[key] = { name: value.name, type: value.type, size: value.size };
            } else {
                payloadObject[key] = value;
            }
        });
        console.log('FormData Content:', payloadObject);
        console.groupEnd();

        alert('Draft saved locally (simulated). Check console for payload.');
    };

    return (
        <div
            className="flex flex-col w-full h-full overflow-hidden font-['Montserrat'] bg-white"
            // MATCHING DASHBOARD LAYOUT PADDING EXACTLY (Top Fixed to 24px)
            style={{
                padding: '24px clamp(16px, 4vw, 48px) clamp(16px, 5vw, 48px) clamp(16px, 4vw, 48px)',
                maxWidth: '1240px'
            }}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                style={{ display: 'none' }}
            />

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
                    onClick={handleDelete}
                    className="flex items-center justify-center transition-colors hover:bg-red-100 cursor-pointer"
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
                    placeholder={errors.title ? errors.title : "Enter Title"}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (errors.title) setErrors({ ...errors, title: '' });
                    }}
                    className={`w-full focus:outline-none transition-all resize-none font-['Montserrat'] ${errors.title ? 'placeholder-red-500' : 'placeholder-[rgba(25,25,25,0.75)]'
                        }`}
                    style={{
                        height: '139px',
                        padding: '20px',
                        borderRadius: '9px',
                        border: errors.title ? '1px solid #dc2626' : '1px solid rgba(7, 7, 7, 0.2)',
                        backgroundColor: '#fff',
                        fontSize: '18px',
                        color: errors.title ? '#dc2626' : 'rgba(25, 25, 25, 0.75)',
                        lineHeight: '1.11'
                    }}
                />
            </div>

            {/* Content Text Area */}
            <div className="w-full flex-1 min-h-0" style={{ marginBottom: '20px' }}>
                <textarea
                    placeholder={errors.content ? errors.content : "Enter Content"}
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                        if (errors.content) setErrors({ ...errors, content: '' });
                    }}
                    className={`w-full h-full focus:outline-none transition-all resize-none font-['Montserrat'] ${errors.content ? 'placeholder-red-500' : 'placeholder-[rgba(25,25,25,0.75)]'
                        }`}
                    style={{
                        padding: '12px 20px',
                        borderRadius: '9px',
                        border: errors.content ? '1px solid #dc2626' : '1px solid rgba(7, 7, 7, 0.2)',
                        backgroundColor: '#fff',
                        fontSize: '18px',
                        color: errors.content ? '#dc2626' : 'rgba(25, 25, 25, 0.75)',
                        lineHeight: '1.5',
                        whiteSpace: 'pre-wrap'
                    }}
                />
            </div>

            {/* Bottom Grid: Image Upload (Left) + Controls (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full shrink-0">

                {/* Image Upload Area */}
                <div
                    onClick={triggerFileUpload}
                    className="w-full flex flex-col items-center justify-center cursor-pointer hover:bg-[#F8F9FA] transition-all group bg-white overflow-hidden relative"
                    style={{
                        height: '289px',
                        border: errors.bannerImage ? '1px solid #dc2626' : '1px solid rgba(7, 7, 7, 0.2)',
                        borderRadius: '9px',
                        gap: '20px'
                    }}
                >
                    {bannerPreview ? (
                        <div className="w-full h-full relative group">
                            <img
                                src={bannerPreview}
                                alt="Banner Preview"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white font-medium text-lg">Click to change</span>
                            </div>
                        </div>
                    ) : (
                        <>
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
                                {errors.bannerImage ? (
                                    <span className="text-[12px] text-red-500 font-medium text-center mt-1 px-4">
                                        {errors.bannerImage}
                                    </span>
                                ) : (
                                    validationError && (
                                        <span className="text-[12px] text-red-500 font-medium text-center mt-1 px-4">
                                            {validationError}
                                        </span>
                                    )
                                )}
                            </div>
                        </>
                    )}
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
                            onChange={(e) => {
                                setCollege(e.target.value);
                                if (errors.college) setErrors({ ...errors, college: '' });
                            }}
                            className="w-full appearance-none focus:outline-none cursor-pointer bg-white"
                            style={{
                                height: '48px',
                                padding: '0 20px',
                                border: errors.college ? '1px solid #dc2626' : '1px solid rgba(7, 7, 7, 0.2)',
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
                        {errors.college && (
                            <span className="text-[12px] text-red-500 absolute -bottom-5 left-1">
                                {errors.college}
                            </span>
                        )}
                    </div>

                    {/* Select Category */}
                    <div className="relative w-full">
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                if (errors.category) setErrors({ ...errors, category: '' });
                            }}
                            className="w-full appearance-none focus:outline-none cursor-pointer bg-white"
                            style={{
                                height: '48px',
                                padding: '0 20px',
                                border: errors.category ? '1px solid #dc2626' : '1px solid rgba(7, 7, 7, 0.2)',
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
                        {errors.category && (
                            <span className="text-[12px] text-red-500 absolute -bottom-5 left-1">
                                {errors.category}
                            </span>
                        )}
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex flex-row items-center justify-between">
                        <button
                            onClick={handleDraft}
                            className="flex items-center justify-center transition-colors hover:bg-gray-100 cursor-pointer"
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
                        onClick={handleSubmit}
                        className="w-full flex items-center justify-center transition-all duration-300 hover:bg-[#1a3366] hover:shadow-lg cursor-pointer transform hover:-translate-y-[2px]"
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
