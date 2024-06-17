import { useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/mutation"
import { useState } from "react"

const useCreateReview = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [mutation, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  })
  const createReview = async (review) => {
    const data = await mutation({
      variables: {
        review
      }
    })

    return data
  }

  return [createReview, errorMessage, result]
}

export default useCreateReview