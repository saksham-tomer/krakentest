import React from "react";

const Button = ({
  type = "button",
  children,
  onClick,
  size = "md",
  className,
  style,
  onMouseOver,
  disabled,
  onMouseLeave,
}) => {
  // Define size styles
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      disabled={disabled}
      type={type}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={style}
      className={`flex items-center justify-center gap-2 rounded bg-accent-dark text-white font-medium tracking-wider focus:border-none focus:outline-none disabled:bg-opacity-75 disabled:text-opacity-75 disabled:cursor-not-allowed ${sizeClasses[size]}  ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
