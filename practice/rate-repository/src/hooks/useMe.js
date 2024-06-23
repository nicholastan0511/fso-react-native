import { GET_ME } from "../graphql/queries"
import { useQuery } from "@apollo/client"
import { useState } from "react"

const useMe = (includeReviews) => {
  const [errorMessage, setErrorMessage] = useState('')
  const { data, loading, error, refetch } = useQuery(GET_ME, {
    variables: {
      includeReviews
    },
    onError: (error) => {
      setErrorMessage(error.message)
    }
  })

  const handleRefetch = async (includeReviews) => {
    const data = await refetch({
      includeReviews
    })

    return data
  }

  let me
  if (!loading && !error)
    me = data.me

  return { me, loading, error, handleRefetch, errorMessage }
}

export default useMe