import React from 'react';

import EditorComponent from '../components/Editor';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = () => (
  <Main meta={<Meta title="Contact" description="Contact description" />}>
    <section className="w-full h-full min-h-screen p-10 border-red-700 border-2">
      <h1> Create a post</h1>
      <EditorComponent />
    </section>
  </Main>
);

export default CreatePost;
