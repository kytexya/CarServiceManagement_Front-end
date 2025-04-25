import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-blue-500 font-medium text-sm">
        Đang tải dữ liệu, vui lòng chờ...
      </p>
    </div>
  );
}
