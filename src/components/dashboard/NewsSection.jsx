import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, label, bgColor }) => (
    <div
        className="font-['Montserrat'] flex flex-col"
        style={{
            width: 'clamp(220px, 18vw, 264px)',
            height: 'clamp(125px, 12vw, 150px)',
            padding: 'clamp(16px, 1.5vw, 20px)',
            borderRadius: '10px',
            border: '1px solid rgba(7, 7, 7, 0.2)',
            backgroundColor: bgColor,
            gap: 'clamp(14px, 1.5vw, 20px)'
        }}
    >
        {/* TITLE */}
        <h3
            style={{
                fontSize: 'clamp(18px, 1.5vw, 22px)',
                fontWeight: 500,
                color: '#3a3a3a',
                margin: 0,
                lineHeight: '1.2'
            }}
        >
            {title}
        </h3>

        {/* VALUE */}
        <div className="flex items-end flex-1">
            <span
                style={{
                    fontSize: 'clamp(40px, 3.5vw, 52px)',
                    fontWeight: 500,
                    color: '#3a3a3a',
                    lineHeight: 1
                }}
            >
                {value}
            </span>

            {label && (
                <span
                    style={{
                        fontSize: 'clamp(16px, 1.5vw, 22px)',
                        fontWeight: 500,
                        color: '#3a3a3a',
                        marginLeft: '8px',
                        paddingBottom: 'clamp(4px, 0.8vw, 8px)'
                    }}
                >
                    {label}
                </span>
            )}
        </div>
    </div>
);


const NewsCard = ({ title, tag, date, status, image }) => (
    <div
        className="font-['Montserrat']"
        style={{
            width: '100%',
            // minWidth removed to prevent horizontal scroll on small screens
            maxWidth: '100%', // Changed from 480px to be responsive
            height: 'auto',
            minHeight: '349.07px',
            maxHeight: '380px',
            borderRadius: '12.4px',
            backgroundColor: '#eef2f7',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer'
        }}
    >
        {/* Image Container */}
        <div style={{ position: 'relative', width: '100%', height: '53.5%' }}>
            <img
                src={image}
                alt={title}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
            {/* Status Badge */}
            <div
                style={{
                    position: 'absolute',
                    top: '12.4px',
                    right: '12.4px',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '400',
                    color: '#ffffff',
                    backgroundColor:
                        status === 'Published' ? '#00c8c1' :
                            status === 'Draft' ? '#dc2626' :
                                '#3b82f6',
                    textTransform: 'capitalize'
                }}
            >
                {status}
            </div>
        </div>

        {/* Content Container */}
        <div
            style={{
                width: '100%',
                minHeight: '162.4px',
                padding: '12.4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '7.5px',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                alignSelf: 'stretch',
                flexGrow: 0,
                boxSizing: 'border-box'
            }}
        >
            {/* Tags */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span
                    style={{
                        padding: '2px 6px',
                        borderRadius: '26091670px',
                        fontSize: '7.46px',
                        fontWeight: '400',
                        color: '#0891b2',
                        backgroundColor: 'rgba(8, 145, 178, 0.1)'
                    }}
                >
                    {tag}
                </span>
                <span
                    style={{
                        padding: '2.49px 7.46px',
                        borderRadius: '26091670px',
                        fontSize: '7.46px',
                        fontWeight: '400',
                        color: 'rgba(25, 25, 25, 0.75)',
                        backgroundColor: '#EEF2F7'
                    }}
                >
                    Event
                </span>
            </div>

            {/* Title */}
            <h3
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    fontSize: '13.69px',
                    fontWeight: '600',
                    color: '#223F7F',
                    lineHeight: '1.3',
                    letterSpacing: '0%',
                    textAlign: 'left',
                    height: '34px',
                    margin: 0,
                    marginBottom: '5px'
                }}
            >
                {title}
            </h3>

            {/* Description */}
            <p
                style={{
                    minHeight: '49px',
                    maxHeight: 'none',
                    fontSize: '9.92px',
                    fontWeight: '400',
                    fontFamily: 'Montserrat',
                    color: 'rgba(25, 25, 25, 0.75)',
                    lineHeight: '1.4',
                    letterSpacing: 'normal',
                    textAlign: 'left',
                    margin: 0,
                    overflow: 'visible',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical'
                }}
            >
                Over 500 delegates from 15 countries participated in the three-day conference featuring renowned speakers and hands-on workshops on advanced nursing practices.
            </p>

            {/* Footer */}
            <div
                style={{
                    height: '18.2px',
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    paddingBottom: '5px',
                    borderTop: 'solid 0.8px rgba(7, 7, 7, 0.2)'
                }}
            >
                {/* Date */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_551_475)">
                            <path d="M4.14746 1.03906V3.11264" stroke="#191919" stroke-opacity="0.75" stroke-width="1.03679" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.29443 1.03906V3.11264" stroke="#191919" stroke-opacity="0.75" stroke-width="1.03679" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9.84987 2.07031H2.59233C2.01973 2.07031 1.55554 2.5345 1.55554 3.1071V10.3646C1.55554 10.9372 2.01973 11.4014 2.59233 11.4014H9.84987C10.4225 11.4014 10.8867 10.9372 10.8867 10.3646V3.1071C10.8867 2.5345 10.4225 2.07031 9.84987 2.07031Z" stroke="#191919" stroke-opacity="0.75" stroke-width="1.03679" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1.55554 5.1875H10.8867" stroke="#191919" stroke-opacity="0.75" stroke-width="1.03679" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_551_475">
                                <rect width="12.4415" height="12.4415" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    <span style={{
                        width: '80px',
                        height: '11px',
                        flexGrow: 0,
                        fontFamily: 'Montserrat',
                        fontSize: '8.69px',
                        fontWeight: '500',
                        fontStretch: 'normal',
                        fontStyle: 'normal',
                        lineHeight: 'normal',
                        letterSpacing: 'normal',
                        textAlign: 'left',
                        color: '#ababab',
                        whiteSpace: 'nowrap'
                    }}>{date}</span>
                </div>

                {/* Read More */}
                <button
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0
                    }}
                >
                    <span style={{
                        width: '54.8px',
                        height: '11px',
                        flexGrow: 0,
                        fontFamily: 'Montserrat',
                        fontSize: '8.7px',
                        fontWeight: '500',
                        fontStretch: 'normal',
                        fontStyle: 'normal',
                        lineHeight: 'normal',
                        letterSpacing: 'normal',
                        textAlign: 'center',
                        color: '#008c8c'
                    }}>Read More</span>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.59174 6.21875H9.84927" stroke="#008C8C" stroke-width="1.03679" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.22076 2.59375L9.84953 6.22252L6.22076 9.85129" stroke="#008C8C" stroke-width="1.03679" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </button>
            </div>
        </div>
    </div>
);

const CreatePostCard = () => {
    const WIDTH = 363.91;
    const HEIGHT = 349.07;
    const RADIUS = 12.32;

    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate('/dashboard/create')}
            style={{
                cursor: 'pointer',
                position: "relative",
                width: '100%',
                // minWidth removed to prevent horizontal scroll
                maxWidth: '100%',
                height: 'auto',
                minHeight: '349.07px',
                maxHeight: '380px',
                padding: "30.79px",
                borderRadius: `${RADIUS}px`,
                backgroundColor: "rgba(166, 110, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20.53px",
                fontFamily: "Montserrat",
                boxSizing: "border-box",
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                preserveAspectRatio="none"
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none"
                }}
            >
                <rect
                    x="0.5"
                    y="0.5"
                    width={WIDTH - 1}
                    height={HEIGHT - 1}
                    rx={RADIUS}
                    ry={RADIUS}
                    fill="none"
                    stroke="rgba(0,0,0,0.8)"
                    strokeWidth="1"
                    strokeDasharray="24 24"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                />
            </svg>

            {/* Plus icon */}
            <div
                style={{
                    width: "61.6px",
                    height: "61.6px",
                    borderRadius: "10.3px",
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M12 5V19M5 12H19"
                        stroke="#191919"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* Text */}
            <span
                style={{
                    fontSize: "26px",
                    fontWeight: 400,
                    color: "#191919",
                    zIndex: 1,
                }}
            >
                Create News Post
            </span>
        </div>
    );
};



const NewsSection = () => {
    // Sample news data - In production, replace with API call:
    // Example API integration:
    // const [newsItems, setNewsItems] = useState([]);
    // const [loading, setLoading] = useState(true);
    // 
    // useEffect(() => {
    //     const fetchNews = async () => {
    //         try {
    //             const response = await fetch('/api/news');
    //             const data = await response.json();
    //             setNewsItems(data);
    //         } catch (error) {
    //             console.error('Error fetching news:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchNews();
    // }, []);
    //
    // Expected JSON structure from API:
    // [
    //   {
    //     "id": 1,
    //     "image": "/newsarticle1.png",
    //     "title": "Article Title",
    //     "tag": "Category Name",
    //     "date": "Month DD, YYYY",
    //     "status": "Published" | "Draft" | "Pending"
    //   }
    // ]

    const [newsItems] = useState([
        {
            id: 1,
            image: `${import.meta.env.BASE_URL}newsarticle1.png`,
            title: "College of Nursing Hosts International Conference on Patient Care Excellence",
            tag: "Nursing",
            date: "November 20, 2024",
            status: "Published"
        },
        {
            id: 2,
            image: `${import.meta.env.BASE_URL}newsarticle1.png`,
            title: "College of Nursing Hosts International Conference on Patient Care Excellence",
            tag: "Nursing",
            date: "November 20, 2024",
            status: "Draft"
        },
        {
            id: 3,
            image: `${import.meta.env.BASE_URL}newsarticle2.png`,
            title: "Medical College Students Secure Top Ranks in NEET PG Examinations",
            tag: "Medical Sciences",
            date: "November 25, 2024",
            status: "Pending"
        },
        {
            id: 4,
            image: `${import.meta.env.BASE_URL}newsarticle3.png`,
            title: "New State-of-the-Art Simulation Lab Inaugurated at Paramedical College",
            tag: "Paramedical Sciences",
            date: "November 22, 2024",
            status: "Published"
        },
        {
            id: 5,
            image: `${import.meta.env.BASE_URL}newsarticle3.png`,
            title: "New State-of-the-Art Simulation Lab Inaugurated at Paramedical College",
            tag: "Paramedical Sciences",
            date: "November 22, 2024",
            status: "Pending"
        }
    ]);

    // Search and Filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all'); // 'all', 'published', 'draft', 'pending'
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // Filter news items based on search and filter
    // Note: In production with API, filtering should be done server-side for better performance
    // Example: fetch(`/api/news?search=${searchTerm}&status=${selectedFilter}`)
    const filteredNews = newsItems.filter(news => {
        const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = selectedFilter === 'all' || news.status.toLowerCase() === selectedFilter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        // For API integration: debounce this function and call API
        // const debounced = debounce(() => fetchNews(e.target.value, selectedFilter), 300);
    };

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        setShowFilterMenu(false);
        // For API integration: call API with new filter
        // fetchNews(searchTerm, filter);
    };

    // Ref for filter dropdown container
    const filterRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilterMenu(false);
            }
        };

        if (showFilterMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilterMenu]);

    return (
        <div className="flex flex-col" style={{
            padding: '24px clamp(16px, 4vw, 48px) clamp(16px, 5vw, 48px) clamp(16px, 4vw, 48px)',
            maxWidth: '1240px'
        }}>
            <h1
                className="font-['Montserrat']"
                style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#223f7f',
                    lineHeight: 'normal',
                    letterSpacing: 'normal',
                    textAlign: 'left',
                    marginBottom: '12px',
                    marginTop: '0'
                }}
            >
                News Section
            </h1>

            {/* Stats Row */}
            <div
                className="flex flex-wrap"
                style={{
                    gap: '20px',
                    marginBottom: 'clamp(12px, 2vw, 20px)',
                    overflowX: 'auto',
                    width: '100%',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                <StatCard
                    title="Published"
                    value="27"
                    bgColor="rgba(0, 200, 193, 0.1)"
                />
                <StatCard
                    title="Draft"
                    value="3"
                    bgColor="rgba(255, 235, 235, 1)"
                />
                <StatCard
                    title="Pending Approvals"
                    value="7"
                    label="Review"
                    bgColor="rgba(226, 232, 240, 1)"
                />
            </div>



            {/* FILTER BAR */}
            <div
                className="flex flex-col sm:flex-row items-stretch sm:items-center"
                style={{
                    gap: 'clamp(8px, 1.5vw, 12px)',
                    marginTop: 'clamp(12px, 2vw, 20px)',
                    width: '100%',
                    overflow: 'visible'
                }}
            >
                {/* SEARCH BAR */}
                <div
                    className="flex items-center bg-white border border-[rgba(7,7,7,0.2)] w-full"
                    style={{
                        maxWidth: '951px',
                        height: 'clamp(40px, 4vw, 44px)',
                        paddingLeft: 'clamp(16px, 4vw, 40px)',
                        paddingRight: 'clamp(16px, 4vw, 40px)',
                        paddingTop: 'clamp(10px, 2vw, 12px)',
                        paddingBottom: 'clamp(10px, 2vw, 12px)',
                        borderRadius: '9px',
                        gap: 'clamp(8px, 1.5vw, 12px)',
                        boxSizing: 'border-box'
                    }}
                >
                    {/* SEARCH ICON */}
                    <div
                        style={{
                            width: 'clamp(16px, 2vw, 20px)',
                            height: 'clamp(16px, 2vw, 20px)'
                        }}
                        className="flex items-center justify-center shrink-0"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.91667 13.3333C6.40278 13.3333 5.12167 12.8089 4.07333 11.76C3.025 10.7111 2.50056 9.43 2.5 7.91667C2.49944 6.40333 3.02389 5.12222 4.07333 4.07333C5.12278 3.02444 6.40389 2.5 7.91667 2.5C9.42944 2.5 10.7108 3.02444 11.7608 4.07333C12.8108 5.12222 13.335 6.40333 13.3333 7.91667C13.3333 8.52778 13.2361 9.10417 13.0417 9.64583C12.8472 10.1875 12.5833 10.6667 12.25 11.0833L16.9167 15.75C17.0694 15.9028 17.1458 16.0972 17.1458 16.3333C17.1458 16.5694 17.0694 16.7639 16.9167 16.9167C16.7639 17.0694 16.5694 17.1458 16.3333 17.1458C16.0972 17.1458 15.9028 17.0694 15.75 16.9167L11.0833 12.25C10.6667 12.5833 10.1875 12.8472 9.64583 13.0417C9.10417 13.2361 8.52778 13.3333 7.91667 13.3333ZM7.91667 11.6667C8.95833 11.6667 9.84389 11.3022 10.5733 10.5733C11.3028 9.84444 11.6672 8.95889 11.6667 7.91667C11.6661 6.87444 11.3017 5.98917 10.5733 5.26083C9.845 4.5325 8.95944 4.16778 7.91667 4.16667C6.87389 4.16556 5.98861 4.53028 5.26083 5.26083C4.53306 5.99139 4.16833 6.87667 4.16667 7.91667C4.165 8.95667 4.52972 9.84222 5.26083 10.5733C5.99195 11.3044 6.87722 11.6689 7.91667 11.6667Z" fill="#191919" fill-opacity="0.75" />
                        </svg>
                    </div>

                    {/* INPUT */}
                    <input
                        type="text"
                        placeholder="Search news by title..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full bg-transparent outline-none font-['Montserrat']"
                        style={{
                            fontSize: 'clamp(14px, 1.6vw, 18px)',
                            color: 'rgba(25, 25, 25, 0.75)',
                            lineHeight: 'normal'
                        }}
                    />

                    {/* CLEAR ICON */}
                    {searchTerm && (
                        <div
                            onClick={() => handleSearch({ target: { value: '' } })}
                            style={{
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L13 13M1 13L13 1" stroke="#191919" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* FILTER BUTTON */}
                <div ref={filterRef} className="w-full sm:w-auto" style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                        className="flex items-center justify-center bg-white border border-[rgba(7,7,7,0.2)] font-['Montserrat'] shrink-0 w-full sm:w-auto cursor-pointer"
                        style={{
                            height: 'clamp(40px, 4vw, 44px)',
                            paddingLeft: 'clamp(16px, 4vw, 40px)',
                            paddingRight: 'clamp(16px, 4vw, 40px)',
                            paddingTop: 'clamp(10px, 2vw, 12px)',
                            paddingBottom: 'clamp(10px, 2vw, 12px)',
                            gap: 'clamp(6px, 1vw, 8px)',
                            borderRadius: '9px',
                            fontSize: 'clamp(14px, 1.6vw, 18px)',
                            lineHeight: 1.11,
                            color: 'rgba(25,25,25,0.75)',
                            boxSizing: 'border-box'
                        }}
                    >
                        Filter
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.8334 2.5H4.16669C2.98835 2.5 2.39919 2.5 2.03335 2.84333C1.66752 3.18667 1.66669 3.74 1.66669 4.84583V5.42083C1.66669 6.285 1.66669 6.7175 1.88335 7.07583C2.10002 7.43417 2.49419 7.6575 3.28502 8.1025L5.71252 9.46917C6.24252 9.7675 6.50835 9.91667 6.69835 10.0817C7.09335 10.4242 7.33669 10.8275 7.44669 11.3233C7.50002 11.56 7.50002 11.8383 7.50002 12.3942V14.6192C7.50002 15.3767 7.50002 15.7558 7.71002 16.0508C7.92002 16.3467 8.29335 16.4925 9.03835 16.7842C10.6042 17.3958 11.3867 17.7017 11.9434 17.3533C12.5 17.005 12.5 16.21 12.5 14.6183V12.3933C12.5 11.8383 12.5 11.56 12.5534 11.3225C12.658 10.8368 12.9216 10.3999 13.3025 10.0808C13.4917 9.91667 13.7575 9.7675 14.2875 9.46833L16.715 8.10167C17.505 7.6575 17.9009 7.435 18.1167 7.07667C18.3334 6.71833 18.3334 6.285 18.3334 5.42V4.845C18.3334 3.74 18.3334 3.18667 17.9667 2.84333C17.6017 2.5 17.0125 2.5 15.8334 2.5Z"
                                stroke="#191919"
                                strokeOpacity="0.75"
                                strokeWidth="1.25"
                            />
                        </svg>
                    </button>

                    {/* Filter Dropdown Menu */}
                    {showFilterMenu && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                marginTop: '8px',
                                backgroundColor: '#fff',
                                border: '1px solid rgba(7,7,7,0.2)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                zIndex: 1000,
                                minWidth: '180px',
                                overflow: 'hidden'
                            }}
                        >
                            {['all', 'published', 'draft', 'pending'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => handleFilterChange(filter)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        textAlign: 'left',
                                        backgroundColor: selectedFilter === filter ? 'rgba(0, 140, 140, 0.1)' : 'transparent',
                                        color: selectedFilter === filter ? '#008c8c' : 'rgba(25, 25, 25, 0.75)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontFamily: 'Montserrat',
                                        fontWeight: selectedFilter === filter ? '600' : '400',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (selectedFilter !== filter) {
                                            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedFilter !== filter) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }
                                    }}
                                >
                                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>


            {/* DIVIDER */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '1116px'
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '1px',
                        backgroundColor: 'rgba(7, 7, 7, 0.2)',
                        marginTop: 'clamp(12px, 2vw, 19px)',
                        marginBottom: 'clamp(12px, 2vw, 19px)'
                    }}
                />
            </div>


            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 363.91px), 1fr))',
                    gap: 'clamp(10px,1.5vw,12.1px)',
                    width: '100%',
                    maxWidth: '1116px'
                }}
            >
                <CreatePostCard />
                {filteredNews.map((news) => (
                    <NewsCard
                        key={news.id}
                        image={news.image}
                        title={news.title}
                        tag={news.tag}
                        date={news.date}
                        status={news.status}
                    />
                ))}
            </div>






        </div>
    );
};

export default NewsSection;
