import React from "react";

// 1. We define what "instructions" this component can receive
interface InputProps {
  label: string;          // The text above the box
  type?: string;          // email, password, text, etc.
  placeholder?: string;    // The gray hint text
  value: string;          // The current text inside
  onChange: (value: string) => void; // What to do when the user types
}

const Input = ({ label, type = "text", placeholder, value, onChange }: InputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      {/* The Label */}
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      {/* The Actual Input Box */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        // When user types, we send the new text back to the parent
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  );
};

export default Input;