import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
  }
}
`

export const VERIFY_AUTHENTICATION = gql`
  query Me {
    me {
      id
      username
    }
  }
`;