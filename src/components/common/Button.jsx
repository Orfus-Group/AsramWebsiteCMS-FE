const Button = ({
    children,
    type = 'button',
    variant = 'primary', // primary, secondary, outline, text
    size = 'medium', // small, medium, large
    fullWidth = false,
    isLoading = false,
    disabled = false,
    onClick,
    className = '',
    ...props
}) => {
    const baseStyles = `
    inline-flex items-center justify-center
    font-sans font-medium
    rounded-[8px]
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-60
    cursor-pointer
    ${fullWidth ? 'w-full' : ''}
  `;

    const sizeStyles = {
        small: 'h-[36px] px-[16px] text-[14px] leading-[20px]',
        medium: 'h-[44px] px-[20px] text-[16px] leading-[24px]',
        large: 'h-[50px] px-[24px] text-[18px] leading-[22px]'
    };

    const variantStyles = {
        primary: `
      bg-[#223f7f] text-white
      hover:bg-[#1a3163]
      active:bg-[#122245]
      focus:ring-[#223f7f]
      shadow-[0_1px_2px_rgba(0,0,0,0.05)]
      rounded-[11.7px]
    `,
        secondary: `
      bg-[#EEF2F7] text-[rgba(25,25,25,0.75)]
      border border-[rgba(7,7,7,0.2)]
      hover:bg-[#E5E7EB]
      active:bg-[#D1D5DB]
      focus:ring-[#223f7f]
      rounded-[11.7px]
    `,
        outline: `
      bg-transparent text-[#374151]
      border border-[#D1D5DB]
      hover:bg-[#F9FAFB]
      active:bg-[#F3F4F6]
      focus:ring-[#6B7280]
    `,
        text: `
      bg-transparent text-[#2B5697]
      hover:bg-[#F8F9FA]
      active:bg-[#E5E7EB]
      focus:ring-[#2B5697]
    `
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
            {...props}
        >
            {isLoading && (
                <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {children}
        </button>
    );
};

export default Button;
