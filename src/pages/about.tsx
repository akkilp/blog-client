import React from 'react';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const About = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <section className="content-wrapper">
      <h2 className="text-3xl p-3 border-l-4 border-gray-700 text-gray-700 font-medium">About</h2>
    </section>
  </Main>
);

export default About;
