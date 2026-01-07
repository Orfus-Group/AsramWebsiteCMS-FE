// src/features/common/layout/PageSection.jsx
import React from "react";

export default function PageSection({
  children,
  className = "",
  bg = "bg-white",
  bgColor,
  sectionClassName = "",
  paddingClass = "",   // ⭐ No default padding
}) {
  return (
    <section
      className={`w-full ${bg} ${sectionClassName} asram-font`}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div
        className={`
          w-full
           max-w-[1440px]
          mx-auto
          px-5     
          sm:px-6
          md:px-10
          lg:px-[120px]

          ${paddingClass}   /* ⭐ Only added if passed by component */
          ${className}
        `}
      >
        {children}
      </div>
    </section>
  );
}
