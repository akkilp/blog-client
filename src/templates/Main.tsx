import process from 'process';

import React, { ReactNode } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

import { userIsLogged } from '../api/userIsLogged';
import NavBar from '../components/NavBar';
import NavLink from '../components/NavLink';

type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const [logged, data] = userIsLogged();

  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="flex-row antialiased w-full font-sans text-black z-0">
      {/* Inject header metadata dynamically */}
      {props.meta}

      <NavBar>
        <div className="flex-column justify-between">
          <NavLink label="blog" linkTo="/" />
          <NavLink label="about" linkTo="/about" />
          <NavLink label="contact" linkTo="/contact" />

          {/* Render admin toolbar if logged in */}
          {logged
          && (
            <div className="pt-10">
              <p className="text-gray-600 text-xl border-b border-gray-600 ">Admin panel</p>
              <NavLink label="Create Post" linkTo="/create_post" />
              {id && (
                <>
                  <NavLink label="Edit Post" linkTo={`/posts/update/${id}`} />
                </>
              )}
            </div>
          )}
        </div>

        <div className="text-white text-xs ">
          {logged
            ? (
              <p>
                Logged in as
                {' '}
                {data?.name}
                .
                {' '}
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await axios.post(`${process.env.NEXT_PUBLIC_API}/authentication/logout`, { withCredentials: true });
                      router.push('/');
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  Log out

                </button>
              </p>
            )
            : <a href="/login">Login as admin</a>}
        </div>

      </NavBar>

      {/* Container for the content */}

      <div className="ml-0 lg:ml-80 min-h-screen">
        {props.children}
      </div>

    </div>
  );
};

export { Main };
