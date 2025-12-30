const Logo = ({ variant = 'full', className = '' }) => {
    if (variant === 'icon') {
        return (
            <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                <path d="M24 4L8 14V34L24 44L40 34V14L24 4Z" fill="#2B5697" />
                <path d="M24 16L16 21V31L24 36L32 31V21L24 16Z" fill="#4A90E2" />
            </svg>
        );
    }

    return (
        <img
            src={`${import.meta.env.BASE_URL}asramlogo.png`}
            alt="ASRAM Logo"
            className={`object-contain block ${className}`}
        />
    );
};

export default Logo;
