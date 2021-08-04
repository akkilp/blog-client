import React from 'react';

import Link from 'next/link';

import { BlogData, Category } from '../interfaces/BlogData.interface';

const CategoryMap = ({ categories }: Pick<BlogData, 'categories'>) => (
  <div className="flex flex-row">
    {categories
      && categories.map((category: Category) => (
        <Link
          key={category.name}
          href={`/categories/${category.name}`}
        >
          <span className="mr-2 text-lg text-gray-600 border-b-2 border-gray-500 hover:text-gray-800 hover:border-gray-800 cursor-pointer">
            {category.name}

          </span>
        </Link>
      ))}
  </div>
);

export default CategoryMap;
