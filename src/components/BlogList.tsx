import React from 'react';

import { BlogData } from '../interfaces/BlogData.interface';
import BlogSlug from './BlogSlug';

interface BlogListProps {
  dataList: BlogData[] | undefined;
  category?: string;
}

const BlogList = ({ dataList, category }: BlogListProps) => {
  if (!dataList) return <p>Couldnt fetch articles from server. Try again later.</p>;
  if (dataList.length === 0) return <p>There are no articles currently.</p>;
  return (
    <>
      <h1 className="text-3xl p-3 border-l-4 border-gray-700 text-gray-700 font-medium">
        {category ? `Articles with tag ${category}` : 'Articles'}
      </h1>
      <ul className="">
        {dataList.map((post: BlogData) => (
          <BlogSlug key={post.id} data={post} />
        ))}
      </ul>
    </>
  );
};

export default BlogList;
