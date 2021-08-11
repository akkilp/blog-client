import React from 'react';

import { BlogData } from '../interfaces/BlogData.interface';
import CategoryMap from './CategoryMap';

interface PostHeaderProps {
  data: BlogData;
}

const PostHeader: React.FC<PostHeaderProps> = ({ data }: PostHeaderProps) => {
  const { title, date, categories } = data;
  return (
    <div className="flex-row">
      <h1 className="text-4xl ">{title}</h1>
      <div className="flex justify-between mt-6">
        <time className="font-medium text-gray-700">{date}</time>
        <CategoryMap categories={categories} />
      </div>
    </div>
  );
};

export default PostHeader;
