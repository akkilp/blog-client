import React from 'react';

import { BlogData, Category } from '../interfaces/BlogData.interface';

const CategoryMap = ({ categories }: Pick<BlogData, 'categories'>) => (
  <div>
    {categories
      && categories.map((category: Category) => (
        <a key={category.name} className="mr-2" href={`/categories/${category.name}`}>
          {category.name}
        </a>
      ))}
  </div>
);

export default CategoryMap;
