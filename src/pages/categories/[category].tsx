import React from 'react';

import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';

import BlogList from '../../components/BlogList';
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { getDate } from '../../utils/getDate';

const CategoryPosts = ({ data, category }: any) => (
  <Main
    meta={(
      <Meta
        title="Kilpo Blog - Thoughts about business, data and psychology"
        description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
      />
    )}
  >
    <main className="content-wrapper">
      <BlogList category={category} dataList={data} />
    </main>
  </Main>
);

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/categories/${params.category}`);

  const parsed = data.posts.map((post: any) => ({
    id: post.id,
    date: getDate(post.created),
    title: post.title,
    categories: post.categories,
  }));

  return { props: { data: parsed, category: params.category } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/categories/`);

  const paths = data.map((category: any) => ({
    /* Id must be converted to string, or raises error */
    params: { category: category.name },
  }));

  // { fallback: false } -> other routes 404
  return { paths, fallback: false };
};

export default CategoryPosts;
