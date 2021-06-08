import React, { ReactNode } from 'react';

import NavBar from '../components/NavBar';
import NavLink from '../components/NavLink';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full font-sans">
    {/* Inject header metadata dynamically */}
    {props.meta}

    <NavBar>
      <NavLink label="blogs" linkTo="/" />
      <NavLink label="about" linkTo="/about" />
      <NavLink label="contact" linkTo="/contact" />
      {true && <NavLink label="Create Post" linkTo="/create_post" />}
    </NavBar>

    {/* Container for the content */}
    <div className="md:ml-80 min-h-screen">{props.children}</div>
  </div>
);

export { Main };
