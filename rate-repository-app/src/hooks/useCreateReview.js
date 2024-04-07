import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useCreateReview = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, rating, repositoryName, text}) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName,
          rating: Number(rating),
          repositoryName,
          text
        }
      },
      headers: {
        'Authorization': `Bearer ${authStorage.getAccessToken()}`
      },
    });

    apolloClient.resetStore();

    return { data }
  };

  return [createReview, ];
};

export default useCreateReview;