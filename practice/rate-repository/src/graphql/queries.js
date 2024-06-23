import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repository($after: String, $first: Int, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(after: $after, first: $first, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

export const GET_ME = gql`
  query Me($includeReviews: Boolean!) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
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

export const GET_ONE_REPO = gql`
  query Query($repositoryId: ID!, $after: String, $first: Int) {
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
      reviews(first: $first, after: $after) {
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
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`