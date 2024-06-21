import { GET_ME } from "../graphql/queries"
import { useQuery } from "@apollo/client"

const useMe = () => {
  const { data, loading, error, refetch } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews: false
    }
  })

  let me
  if (!loading && !error)
    me = data.me

  return { me, loading, error, refetch }
}

export default useMe