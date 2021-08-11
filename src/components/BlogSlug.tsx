import React from 'react';

import Link from 'next/link';

import { BlogData } from '../interfaces/BlogData.interface';
import CategoryMap from './CategoryMap';

interface BlogSlugProps {
  data: BlogData;
}

const BlogSlug = ({ data }: BlogSlugProps) => {
  const {
    title, date, id, categories,
  } = data;

  return (
    <Link href={`/posts/${id}`}>
      <div className="hover:bg-gray-200 transition duration-200 hover:scale-125 flex-row border-gray-700 border-b-2 text-gray-900 text-lg p-5 cursor-pointer">
        <h2 className="text-xl  ">{title}</h2>
        <div className="flex justify-between text-md pt-1">
          <CategoryMap categories={categories} />
          <time>{date}</time>
        </div>
      </div>
    </Link>
  );
};

export default BlogSlug;
