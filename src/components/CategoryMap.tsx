import React from 'react';

import { BlogData, Category } from '../interfaces/BlogData.interface';

const CategoryMap = ({ categories }: Pick<BlogData, 'categories'>) => (
  <div className="flex flex-row">
    {categories
      && categories.map((category: Category) => (
        <a
          key={category.name}
          className="mr-2 text-lg text-gray-600 border-b-2 border-gray-500"
          href={`/categories/${category.name}`}
        >
          {category.name}
        </a>
      ))}
  </div>
);

export default CategoryMap;
