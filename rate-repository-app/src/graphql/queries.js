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
        }
      }
    }
  }
`