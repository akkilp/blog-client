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
      <div className="flex-row p-4 border-t-1 border-gray-700 border-t-2 text-gray-900 text-lg">
        <div className="flex justify-between">
          <h2 className="text-xl">{title}</h2>
          <time>{date}</time>
        </div>
        <CategoryMap categories={categories} />
      </div>
    </Link>
  );
};

export default BlogSlug;
