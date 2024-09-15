import React from 'react';

type InputProps = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
};

const Input: React.FC<InputProps> = ({ id, value, onChange, placeholder, type = 'text' }) => {
  return (
    <input
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className="p-2 border rounded w-full"
    />
  );
};

export default Input;
