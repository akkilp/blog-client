import React from 'react';

import { DiscussionEmbed } from 'disqus-react';

interface DisqusProps {
  id: number;
  title: string;
}

const DisqusComments = ({ id, title }: any) => {
  const disqusShortname = 'Kilpo';
  const disqusConfig = {
    url: `lolloroo/${id}`,
    identifier: id, // Single post id
    title, // Single post title
  };
  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
};
export default DisqusComments;
