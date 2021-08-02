import React, { ReactEventHandler } from 'react';

interface TextInputProps{
  name: string;
  error?: any;
  initValue?: string;
  onChange: any;
  placeholder?: any;
  variant?: 'small';
  type?: 'password' | 'text';
}

const TextInput: React.FC<TextInputProps> = ({
  onChange, name, error, placeholder, variant, initValue, type = 'text',
}:TextInputProps) => (
  <div className={`w-full ${variant === 'small' && 'w-80'} px-3 mb-6 md:mb-0`}>
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={name}>
      {name}
      <input
        className={`appearance-none block w-full bg-gray-200 text-gray-700 text-lg border ${error && 'border-red-500'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
        onChange={(e: React.FormEvent<HTMLInputElement>): void => {
          onChange(e);
        }}
        value={initValue}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </label>
    {error && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
  </div>
);

export default TextInput;
