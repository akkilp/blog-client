import React from 'react';

import Chip from '@bit/mui-org.material-ui.chip';

import Button from './Button';

interface CategoryInputProps{
  name: string;
  handleAdd: any;
  placeholder?: any;
  categories: any;
  handleDelete: any;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  handleAdd, name, placeholder, categories, handleDelete,
}:CategoryInputProps) => {
  const [state, setState] = React.useState('');
  const [error, setError] = React.useState('');

  const handleClick = () => {
    if (state.length === 0) {
      setError('Category is empty');
      return;
    }
    handleAdd(state);
    setState('');
  };
  return (
    <div className="w-full  sm:w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={name}>
        {name}
        <div className="flex">
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 text-lg border ${error && 'border-red-500'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              if (error) setError('');
              setState(e.target.value);
            }}
            id={name}
            name={name}
            type="text"
            placeholder={placeholder}
            value={state}
          />
          <Button type="button" label="Add" onClick={handleClick} />
          {categories?.length > 0 && categories.map((category: any) => (
            <div key={category.name} className="mb-3 ml-3 capitalize">
              <Chip
                label={category.name}
                onDelete={() => handleDelete(category.name)}
              />
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </label>
    </div>
  );
};

export default CategoryInput;
