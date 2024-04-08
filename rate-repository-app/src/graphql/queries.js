import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          stargazersCount
          fullName
          description
          id
          ownerAvatarUrl
          forksCount
          language
          reviewCount
          ratingAverage
          url
        }
      }
    }
  }
`

export const GET_SINGLE_REPOSITORY = gql`
query Repository($repositoryId: ID!) {
  repository(id: $repositoryId) {
    stargazersCount
    fullName
    description
    id
    ownerAvatarUrl
    forksCount
    language
    reviewCount
    ratingAverage
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`

export const GET_USER = gql`
query getCurrentUser($includeReviews: Boolean = false) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          createdAt
          rating
          id
          text
          repository {
            fullName
          }
        }
      }
    }
  }
}
`;