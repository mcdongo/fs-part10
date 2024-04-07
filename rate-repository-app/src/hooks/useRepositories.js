import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES, GET_SINGLE_REPOSITORY } from '../graphql/queries';

export const useSingleRepository = (id) => {
  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      repositoryId: id
    }
  });

  const repository = loading === false
    ? data.repository
    : null

  return { repository, loading, error };
}

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const repositories = loading === false
    ? data.repositories
    : null;

  return { repositories, loading, error };
};

export default useRepositories;