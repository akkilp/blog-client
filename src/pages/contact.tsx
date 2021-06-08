import React from 'react';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const Contact = () => (
  <Main meta={<Meta title="Contact" description="Contact description" />}>
    <section className="content-wrapper">Contacts</section>
  </Main>
);

export default Contact;
