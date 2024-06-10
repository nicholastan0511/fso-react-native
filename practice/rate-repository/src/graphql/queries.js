import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          language
          name
          ownerAvatarUrl
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
        }
      }
    }
  }
`

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`