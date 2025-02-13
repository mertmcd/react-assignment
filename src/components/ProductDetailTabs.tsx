import { useState, useEffect } from "react";
import { TabsProps } from "../types/tabs";

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (activeIndex >= tabs.length) {
      setActiveIndex(0);
    }
  }, [tabs, activeIndex]);

  return (
    <div>
      <div className="flex border-b border-gray-300 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 w-1/2 text-center font-semibold ${
              activeIndex === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs[activeIndex] && <div>{tabs[activeIndex].content}</div>}{" "}
    </div>
  );
};

export default Tabs;
