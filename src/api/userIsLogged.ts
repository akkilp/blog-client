import React from 'react';

import axios from 'axios';
import useSWR from 'swr';

// @ts-ignore
const fetcher = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);

export const userIsLogged = () => {
  const { data, error } = useSWR('http://localhost:3050/authentication/', fetcher, {
    onErrorRetry: (err) => {
      // Dont retry request, when error status is unauthorized
      // eslint-disable-next-line no-useless-return
      if (err.status === 401) return;
    },
  });
  const [logged, setLogged] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!data || error) setLogged(false);
    else setLogged(true);
  }, [data, error]);

  return [logged, data];
};
