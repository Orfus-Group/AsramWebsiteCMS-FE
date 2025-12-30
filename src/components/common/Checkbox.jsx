const Checkbox = ({
    name,
    checked,
    onChange,
    label,
    disabled = false,
    className = ''
}) => {
    return (
        <div className={`flex items-center gap-[8px] ${className}`}>
            <div className="relative flex items-center">
                <input
                    id={name}
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="
            w-[14px] h-[14px]
            appearance-none
            border-none
            rounded-[22.4px]
            bg-[rgba(25,25,25,0.75)]
            transition-all duration-200
            cursor-pointer
            checked:bg-[#2B5697]
            focus:outline-none
            disabled:bg-[#F3F4F6] disabled:cursor-not-allowed
          "
                />
                {checked && (
                    <svg
                        className="absolute left-0 top-0 w-[14px] h-[14px] pointer-events-none p-[2px]"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14 5.5L7.5 12L4 8.5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>

            {label && (
                <label
                    htmlFor={name}
                    className="text-[14px] leading-[20px] font-normal text-[rgba(25,25,25,0.75)] cursor-pointer select-none"
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default Checkbox;
