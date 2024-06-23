import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const variables = {
  orderBy: "RATING_AVERAGE",
  orderDirection: "DESC",
  first: 3
}

const useRepositories = () => {
  const { data, error, loading, refetch, fetchMore } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network', 
      variables
    }
  ) 

  const handleFetchMore = () => {

    let hasNextPage;
    if (data) {
      hasNextPage = data.repositories.pageInfo.hasNextPage
    }

    const canFetchMore = !loading && hasNextPage

    console.log(hasNextPage)

    if (!canFetchMore) {
      return 
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      }
    })
  }

  let repositories

  if (!loading && !error)
    repositories = data.repositories
  
  return { repositories, loading, error, refetch, fetchMore: handleFetchMore};
};

export default useRepositories;