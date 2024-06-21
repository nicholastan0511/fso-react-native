import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repository($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
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

export const GET_ONE_REPO = gql`
  query Query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      url
      language
      name
      ownerAvatarUrl
      reviewCount
      ratingAverage
      forksCount
      stargazersCount
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