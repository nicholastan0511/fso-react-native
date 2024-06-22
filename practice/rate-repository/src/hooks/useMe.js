import { GET_ME } from "../graphql/queries"
import { useQuery } from "@apollo/client"

const useMe = (includeReviews) => {
  const { data, loading, error, refetch } = useQuery(GET_ME, {
    variables: {
      includeReviews
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

  return { me, loading, error, handleRefetch }
}

export default useMe