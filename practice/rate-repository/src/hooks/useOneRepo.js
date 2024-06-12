import { useQuery } from "@apollo/client"
import { GET_ONE_REPO } from "../graphql/queries"

const useOneRepo = (id) => {
  const { loading, error, data } = useQuery(GET_ONE_REPO, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network'
  })


  return { repo: data ? data.repository : null, loading, error }  
}

export default useOneRepo