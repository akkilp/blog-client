import React from 'react';

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }: PostContentProps) => (
  // eslint-disable-next-line react/no-danger
  <div className="dynamic-content" dangerouslySetInnerHTML={{ __html: content }} />
);

export default PostContent;
