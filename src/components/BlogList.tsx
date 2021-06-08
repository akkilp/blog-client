import React from 'react';

import { BlogData } from '../interfaces/BlogData.interface';
import BlogSlug from './BlogSlug';

interface BlogListProps {
  dataList: BlogData[] | undefined;
}

const BlogList = ({ dataList }: BlogListProps) => {
  if (!dataList) return <p>Couldnt fetch articles from server. Try again later.</p>;
  if (dataList.length === 0) return <p>There are no articles currently.</p>;

  return (
    <>
      <h1 className="text-3xl pb-4">Articles</h1>
      <ul>
        {dataList.map((post: BlogData) => (
          <BlogSlug data={post} />
        ))}
      </ul>
    </>
  );
};

export default BlogList;
