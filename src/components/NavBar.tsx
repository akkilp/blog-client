import React from 'react';

interface NavBarProps {
  children: JSX.Element | JSX.Element[];
}
const NavBar = ({ children }: NavBarProps) => (
  <nav className="md:flex md:flex-col md:px-12 md:pt-14 md:justify-between fixed md:w-80 md:h-screen bg-black text-xl p-2">
    <div>
      <div className="md:mb-12">
        <p className=" text-gray-300 mt-0 pb-1 text-4xl">kilpo</p>
        <p className="text-gray-700 leading-6 font-bold pl-2 border-l-2 border-gray-700">
          Thoughts about business, data and psychology.
        </p>
      </div>
      <ul className="flex-row flex-wrap items-center">{children}</ul>
    </div>
    <div className="text-white text-xs ">
      <a href="/login">Login as admin</a>
    </div>

  </nav>
);

export default NavBar;
