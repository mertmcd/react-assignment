import React from "react";

interface SkeletonLoaderProps {
  height?: string;
  width?: string;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  height = "100%",
  width = "100%",
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse ${className}`}
      style={{ height, width }}
    />
  );
};

export default SkeletonLoader;
