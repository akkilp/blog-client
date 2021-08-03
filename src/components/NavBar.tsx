import React from 'react';

import MenuIcon from './MenuIcon';

interface NavBarProps {
  children: JSX.Element | JSX.Element[];
}
const NavBar = ({ children }: NavBarProps) => {
  const [showIcon, setShowIcon] = React.useState(false);

  const handleShow = () => {
    console.log('terve', showIcon);
    setShowIcon(!showIcon);
  };
  return (
    <>
      <div className={`lg:invisible visible ${showIcon ? 'fixed' : 'absolute'} fill-current text-gray-700 z-50 right-14 top-4 w-10 h-10`} onClick={handleShow}>
        <MenuIcon />
      </div>
      <nav className={`${showIcon ? 'visible' : 'invisible'} lg:visible w-screen h-screen lg:px-12 lg:pt-14 lg:justify-between fixed lg:w-80 z-10 bg-black text-xl p-2`}>
        <div className="flex flex-col h-full">
          <div className="lg:mb-12">
            <h1 className=" text-gray-300 mt-0 pb-1 text-4xl">kilpo</h1>
            <p className=" text-gray-700 leading-6 font-bold p-2 pr-4 border-l-2 border-gray-700">
              Thoughts about business, data and psychology.
            </p>
          </div>
          <div className="flex flex-col flex-wrap justify-between h-full">{children}</div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
