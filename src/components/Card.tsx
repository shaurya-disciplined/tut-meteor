import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-secondary/30 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
