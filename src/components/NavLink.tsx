import React from 'react';

import Link from 'next/link';

interface NavLinkProps {
  label: string;
  linkTo: string;
}

const NavLink = ({ label, linkTo }: NavLinkProps) => (
  <li className="my-3">
    <Link href={linkTo}>
      <a className="text-gray-300 border-none hover:text-gray-700 capitalize">{label}</a>
    </Link>
  </li>
);

export default NavLink;
