import React from "react";

interface Props {
  className?: string;
}

export const GuestHomePage: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      {/* Your component content here */}
    </div>
  );
};