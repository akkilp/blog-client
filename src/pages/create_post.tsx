/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/semi */
import React from 'react';

import axios from 'axios';
import { GetServerSideProps } from 'next';

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
  console.log('tämmösetä tulee täältä tänään');
  console.log(context.req.headers);
  async function getHeaders(ctx: any) {
    if (ctx?.req?.cookies) {
      const cookieItems = []
      for (let key of Object.keys(ctx?.req?.cookies)) {
        cookieItems.push(`${key}=${ctx.req.cookies[key]}`)
      }
      return {
        cookie: cookieItems.join('; '),
      }
    }

    return {
    }
  }

  try {
    // Check whether the user is logged in
    await axios.get(
      `${process.env.NEXT_PUBLIC_API}/authentication`,
      {
        withCredentials: true,
        // Cookies are attached to the request with context
        headers: getHeaders(context),
      },
    );

    return {
      props: {},
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

export default CreatePost;
