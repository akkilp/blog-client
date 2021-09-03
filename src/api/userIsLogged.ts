import axios from 'axios';
import useSWR from 'swr';

// @ts-ignore
const fetcher = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);

export const userIsLogged = () => {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API}/authentication/`, fetcher, {
    onErrorRetry: (err) => {
      // Dont retry request, when error status is unauthorized
      // eslint-disable-next-line no-useless-return
      if (err.status === 401) return;
    },
  });

  return [data, error];
};
