import { useQuery } from '@apollo/client';

import { GET_USER } from '../graphql/queries';
import useAuthStorage from './useAuthStorage';

const useGetUser = (includeReviews = false) => {
  const authStorage = useAuthStorage();
  const { data, error, loading } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    headers: {
      'Authorization': `Bearer ${authStorage.getAccessToken()}`
    },
    variables: {
      includeReviews
    }
  });

  const user = loading === false
    ? data.me
    : null;

  return { user, loading, error };
};

export default useGetUser;