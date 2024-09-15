import React from 'react';

type TextareaProps = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
};

const Textarea: React.FC<TextareaProps> = ({ id, value, onChange, placeholder }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-2 border rounded w-full"
    />
  );
};

export default Textarea;
