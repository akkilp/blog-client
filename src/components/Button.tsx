import React from 'react';

interface ButtonProps{
  label: string;
  type: 'button' | 'submit';
  onClick ?: any;
  className?:string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label, type = 'button', onClick, className, disabled = false,
}: ButtonProps) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={`bg-gray-700 mx-1 capitalize hover:bg-gray-600 text-white ml-0 mb-3 font-bold py-3 px-4 rounded ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>

);

export default Button;
