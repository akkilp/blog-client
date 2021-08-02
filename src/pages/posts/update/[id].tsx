import { title } from 'process';

import React from 'react';

import axios from 'axios';
import { GetServerSideProps } from 'next';

import WritePost, { FormProps } from '../../../components/WritePost';
import { Main } from '../../../templates/Main';

const UpdatePost = ({ postData }: any) => (
  <Main>
    <section className="w-full h-full min-h-screen p-10 ">
      <h1 className="text-4xl pb-8">Edit post</h1>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <WritePost {...postData} />
    </section>
  </Main>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.params);
  try {
    // Check whether the user is logged in
    await axios.get(
      'http://localhost:3050/authentication',
      {
        withCredentials: true,
        // Cookies are attached to the request with context
        headers: context.req ? { cookie: context.req.headers?.cookie } : { cookie: '' },
      },
    );

    const response = await axios.get(`http://localhost:3050/posts/${context.params.id}`);

    if (response?.data) {
      const postData = {
        content: response.data.content,
        title: response.data.title,
        categories: response.data.categories,
      };

      return {
        props: { postData },
      };
    }
    return {
      props: { },
    };
  } catch (err) {
    // Redirect to login, if api connection rejects with unaunthorized
    console.log(err);

    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },

    };

    console.log('Something unexpected happened, returning to login.');
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

export default UpdatePost;
