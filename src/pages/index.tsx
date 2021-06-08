import React from 'react';

import axios from 'axios';
import { GetStaticProps } from 'next';

import BlogList from '../components/BlogList';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { getDate } from '../utils/getDate';

const Index = ({ data }: any) => (
  <Main
    meta={(
      <Meta
        title="Kilpo Blog - Thoughts about business, data and psychology"
        description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
      />
    )}
  >
    <main className="content-wrapper">
      <BlogList dataList={data} />
    </main>
  </Main>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get('http://localhost:3050/posts/');

  const parsed = data.map((post: any) => ({
    id: post.id,
    date: getDate(post.created),
    title: post.title,
    categories: post.categories,
  }));

  return {
    props: {
      data: parsed,
    },
  };
};

export default Index;
