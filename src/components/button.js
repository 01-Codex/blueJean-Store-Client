"use client";

export default function Button({ type = "button", onClick, children, className = "", ...props }) {
  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
