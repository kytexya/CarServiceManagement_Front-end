import React from "react";

export default function TabsSelector({ tabs = [], active, onChange }) {
  return (
    <div className="flex min-w-[300px] whitespace-nowrap overflow-x-auto gap-x-3 h-[60px] py-2 px-4">
      {tabs.map((tab) => {
        const isActive = active === tab.value;
        return (
          <div
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`flex items-center gap-x-3 cursor-pointer py-3 px-6 text-md font-bold rounded-xl overflow-hidden
              ${
                isActive ? "bg-highlight text-white" : "border border-gray-100"
              }`}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}
