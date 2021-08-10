import React from 'react';

interface ButtonProps{
  label: string;
  onClick: any;
  className?:string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }: ButtonProps) => (
  <button type="button" className={`bg-gray-700 mx-1 capitalize hover:bg-gray-600 text-white mb-3 font-bold py-3 px-4 rounded ${className}`} onClick={onClick}>{label}</button>

);

export default Button;
