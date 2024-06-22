import { useMutation } from "@apollo/client"
import { DELETE_REVIEW } from "../graphql/mutation"
import { useState } from "react"
import { Alert } from "react-native"

const useDeleteReview = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [mutation, result] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  })

  const deleteReview = async (id, refetch) => {
    Alert.alert('Deleting this repo!', 'Are you sure?', [
      {
        text: 'Yes',
        onPress: async () => {
          console.log('Delete Review Called!')
          await alertDelete(id)
          await refetch(false)
        }
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
    ])
  }

  const alertDelete = async (id) => {
    console.log(id)
    const data = await mutation({
      variables: {
        deleteReviewId: id
      }
    })

    return data
  }

  return { deleteReview, result, errorMessage }
}

export default useDeleteReview