import React, { ReactEventHandler } from 'react';

interface TextInputProps{
  name: string;
  error?: any;
  initValue?: string;
  onChange: any;
  placeholder?: any;
  styles: string;
}

const TextArea: React.FC<TextInputProps> = ({
  onChange, name, error, placeholder, styles, initValue,
}:TextInputProps) => (
  <div className={`w-full ${styles} px-3 mb-6 md:mb-0`}>
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={name}>
      {name}
      <textarea
        className={`appearance-none block w-full h-48 bg-gray-200 text-gray-700 text-lg border ${error && 'border-red-500'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
        onChange={(e: React.FormEvent<HTMLInputElement>): void => {
          onChange(e);
        }}
        value={initValue}
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
      />
    </label>
    {error && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
  </div>
);

export default TextArea;
