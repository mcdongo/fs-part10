import { useQuery } from '@apollo/client';

import { VERIFY_AUTHENTICATION } from '../graphql/queries';
import useAuthStorage from './useAuthStorage';

const useVerifyAuthorization = () => {
  const authStorage = useAuthStorage();
  const { data, error, loading } = useQuery(VERIFY_AUTHENTICATION, {
    fetchPolicy: 'cache-and-network',
    headers: {
      'Authorization': `Bearer ${authStorage.getAccessToken()}`
    }
  });

  const user = loading === false
    ? data.me
    : null;

  return { user, loading, error };
};

export default useVerifyAuthorization;