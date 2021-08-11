/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { useField } from 'formik';

const Input = (props:any) => {
  const [field, meta] = useField(props);

  return (
    <label
      htmlFor={props.name}
      className="block uppercase tracking-wide text-gray-700  text-xs font-bold mb-2"
    >
      {props.name}

      {props.type === 'textarea'
        ? (
          <textarea
            {...field}
            {...props}
            className="appearance-none block w-full h-48 bg-gray-200 text-gray-700 text-lg border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-gray-100"
          />
        )
        : (
          <input
            {...field}
            {...props}
            className="appearance-none block w-full bg-gray-200 text-gray-700 text-lg border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-gray-100"
          />
        ) }
      {meta.error && meta.touched && <div className="text-red-500 text-xs italic float-right">{meta.error}</div>}
    </label>

  );
};

export default Input;
