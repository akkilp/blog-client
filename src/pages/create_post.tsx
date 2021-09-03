import React from 'react';

import axios from 'axios';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Check whether the user is logged in
    await axios.get(
      `${process.env.NEXT_PUBLIC_API}/authentication`,
      {
        withCredentials: true,
        // Cookies are attached to the request with context
        headers: context.req ? { cookie: context.req.headers.cookie } : undefined,
      },
    );

    return {
      props: {},
    };
  } catch (err) {
    console.log('pärähti vituiks', err);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

export default CreatePost;
