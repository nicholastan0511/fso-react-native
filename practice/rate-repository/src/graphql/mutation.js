import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      expiresAt
      user {
        username
        id
        reviewCount
      }
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
      createdAt,
      id
      rating
      text
      repositoryId
    }
  }
` 

export const SIGN_UP = gql`
  mutation CreateReview($user: CreateUserInput) {
    createUser(user: $user) {
      createdAt
      id
      username
    }
  }
`