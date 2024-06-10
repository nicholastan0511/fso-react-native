import { GET_ME } from "../graphql/queries"
import { useQuery } from "@apollo/client"

const useMe = () => {
  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network'
  })

  let me
  if (!loading && !error)
    me = data.me

  return { me, loading, error }
}

export default useMe