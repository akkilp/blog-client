import React from 'react';

import router from 'next/router';

import { userIsLogged } from '../api/userIsLogged';
import WritePost from '../components/WritePost';
import { Main } from '../templates/Main';

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, error] = userIsLogged();

  React.useEffect(() => {
    if (error || !data) {
      router.push('/login');
    }
  }, []);

  return (
    <Main>
      <section className="w-full h-full min-h-screen p-10 ">
        {(!error && data) ? (
          <>
            <h1 className="text-4xl pb-8">Create a post</h1>
            <WritePost />
          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </section>
    </Main>
  );
};

export default CreatePost;
