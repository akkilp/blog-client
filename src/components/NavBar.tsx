import React from 'react';

interface NavBarProps {
  children: JSX.Element | JSX.Element[];
}
const NavBar = ({ children }: NavBarProps) => (
  <nav className="md:px-12 md:pt-14 md:justify-between fixed md:w-80 md:h-screen bg-black text-xl p-2">
    <div className="flex flex-col h-full">
      <div className="md:mb-12">
        <h1 className=" text-gray-300 mt-0 pb-1 text-4xl">kilpo</h1>
        <p className="text-gray-700 leading-6 font-bold pl-2 border-l-2 border-gray-700">
          Thoughts about business, data and psychology.
        </p>
      </div>
      <div className="flex flex-col flex-wrap justify-between h-full">{children}</div>
    </div>

  </nav>
);

export default NavBar;
