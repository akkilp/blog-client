import React from 'react';

import Link from 'next/link';

interface NavLinkProps {
  label: string;
  linkTo: string;
}

const NavLink = ({ label, linkTo }: NavLinkProps) => (
  <div className="my-3 flex lg:p-0 lg:text-xl lg:justify-start justify-center p-3 text-4xl">
    <Link href={linkTo}>
      <a className="text-gray-300 border-none hover:text-gray-700 capitalize">{label}</a>
    </Link>
  </div>
);

export default NavLink;
