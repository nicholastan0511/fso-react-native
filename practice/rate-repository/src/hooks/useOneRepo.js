import { useQuery } from "@apollo/client"
import { GET_ONE_REPO } from "../graphql/queries"

const useOneRepo = (id) => {
  const variables = { 
    repositoryId: id, 
    first: 1
  }

  const { loading, error, data, fetchMore } = useQuery(GET_ONE_REPO, {
    variables,
    fetchPolicy: 'cache-and-network'
  })

  const handleFetchmore = () => {
    let hasNextPage;
    if (data) {
      hasNextPage = data.repository.reviews.pageInfo.hasNextPage
    }

    const canFetchMore = !loading && hasNextPage
 
    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables
      }
    })
  }


  return { repo: data ? data.repository : null, loading, error, fetchMore: handleFetchmore }  
}

export default useOneRepo