import console from 'console';
import { title } from 'process';

import React from 'react';

import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import DisqusComments from '../../components/DisqusComment';
import PostContent from '../../components/PostContent';
import PostHeader from '../../components/PostHeader';
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { getDate } from '../../utils/getDate';

const Post = ({ postData }: any) => {
  const router = useRouter();
  const { id } = router.query;

  const { content, ...headerData } = postData;
  return (
    <Main meta={<Meta title={title} description={title} />}>
      <article className="content-wrapper text-gray-900">
        <PostHeader data={{ id, ...headerData }} />
        <PostContent content={content} />
        <div className="border-b-2 border-gray-500 w-11/12 pt-12 pl-12 mb-12 mx-auto" />
        <DisqusComments id={id} title={headerData.title} />
      </article>
    </Main>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { data } = await axios.get(`http://localhost:3050/posts/${params.id}`);

  const postData = {
    content: data.content,
    date: getDate(data.created),
    title: data.title,
    categories: data.categories,
    author: data.author,
  };

  return { props: { postData } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get('http://localhost:3050/posts/');

  const paths = data.map((post: any) => ({
    /* Id must be converted to string, or raises error */
    params: { id: post.id.toString() },
  }));

  // { fallback: false } -> other routes 404
  return { paths, fallback: false };
};

export default Post;
