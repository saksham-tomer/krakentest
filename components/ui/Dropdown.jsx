import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const SAMPLE_COUNTRIES = [
  { label: "United States", value: "us", population: "331 million" },
  { label: "China", value: "cn", population: "1.4 billion" },
  { label: "India", value: "in", population: "1.38 billion" },
  { label: "Brazil", value: "br", population: "214 million" },
  { label: "Japan", value: "jp", population: "125 million" },
  { label: "Germany", value: "de", population: "83 million" },
  { label: "United Kingdom", value: "uk", population: "67 million" },
  { label: "France", value: "fr", population: "67 million" },
  { label: "Italy", value: "it", population: "60 million" },
  { label: "Canada", value: "ca", population: "38 million" },
];

const Dropdown = ({ label = "Select option", options = [], onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="relative w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 flex items-center justify-between bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-gray-700">
          {selectedOption ? selectedOption.label : label}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const DropdownDemo = () => {
  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center gap-2">
        <Dropdown label="Sort by" options={SAMPLE_COUNTRIES} className="" />
      </div>
    </div>
  );
};

export default DropdownDemo;
