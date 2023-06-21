import React from 'react';

const PostCardSkeleton = () => {
  return (
    <div
      className="
      border-b-[1px]
      border-[#eff3f4]
      p-5
      cursor-pointer
      hover:bg-[#f5f5f5]
      transition
      animate-pulse
    "
    >
      <div className="flex flex-row items-start gap-3">
        <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <div className="h-8 w-48 bg-gray-300 rounded"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>
          <div className="h-12 w-64 bg-gray-300 rounded mt-1"></div>
          <div className="h-4 w-48 bg-gray-300 rounded mt-3"></div>
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
