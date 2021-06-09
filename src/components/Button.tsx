import React from 'react';

interface ButtonProps{
  label: string;
  onClick: any;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }: ButtonProps) => (
  <button type="button" className="hover:text-gray-400 ml-1 mb-3 w-14 rounded-md min-h-full bg-gray-600 text-white font-medium " onClick={onClick}>{label}</button>

);

export default Button;
