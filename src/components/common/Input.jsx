const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    icon,
    rightIcon,
    disabled = false,
    required = false,
    className = ''
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-[14px] leading-[20px] font-medium text-[rgba(25,25,25,0.75)]"
                    style={{ marginBottom: '8px' }}
                >
                    {label}
                    {required && <span className="text-[#DC2626] ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {/* Left Icon */}
                {icon && (
                    <div className="absolute left-[20px] top-1/2 -translate-y-1/2 pointer-events-none">
                        {icon}
                    </div>
                )}

                {/* Input Field */}
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    style={{
                        paddingLeft: icon ? '45px' : '20px',
                        paddingRight: rightIcon ? '45px' : '20px'
                    }}
                    className={`
            w-full h-[52px]
            ${type === 'password' ? 'text-[24px] tracking-widest py-0' : 'text-[14px] leading-[20px]'} 
            font-normal text-[#111827]
            placeholder:text-[14px] placeholder:tracking-normal placeholder:text-[rgba(25,25,25,0.75)]
            bg-white
            border border-[rgba(7,7,7,0.2)]
            rounded-[10px]
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#2B5697] focus:border-transparent
            hover:border-[#9CA3AF]
            disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed
            ${error ? 'border-[#DC2626] focus:ring-[#DC2626]' : ''}
          `}
                />

                {/* Right Icon */}
                {rightIcon && (
                    <div className="absolute right-[20px] top-1/2 -translate-y-1/2">
                        {rightIcon}
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-[8px] text-[12px] leading-[16px] text-[#DC2626] font-medium">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
