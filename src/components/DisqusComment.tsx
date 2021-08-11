import React from 'react';

import { DiscussionEmbed } from 'disqus-react';

interface DisqusProps {
  id: string;
  title: string;
}

const DisqusComments = ({ id, title }: DisqusProps) => {
  const disqusShortname = 'Kilpo';
  const disqusConfig: any = {
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
