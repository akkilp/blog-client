import React from 'react';

interface ButtonProps{
  label: string;
  onClick: any;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }: ButtonProps) => (
  <button type="button" className="bg-blue-500 mx-1 hover:bg-blue-700 text-white mb-3 font-bold py-3 px-4 rounded" onClick={onClick}>{label}</button>

);

export default Button;
