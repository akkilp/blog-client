import React from 'react';

import { EditorComponent } from '../components/Editor';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = () => (
  <Main meta={<Meta title="Contact" description="Contact description" />}>
    <section className="content-wrapper">
      editor
    </section>
  </Main>
);

export default CreatePost;
