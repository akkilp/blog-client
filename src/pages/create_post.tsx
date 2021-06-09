import React from 'react';

import WritePost from '../components/WritePost';
import { Main } from '../templates/Main';

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = () => (
  <Main>
    <section className="w-full h-full min-h-screen p-10 border-red-700 border-2">
      <h1 className="text-4xl pb-8"> Create a post</h1>
      <WritePost />
    </section>
  </Main>
);

export default CreatePost;
