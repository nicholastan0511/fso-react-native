import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
      variables: {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC"
      }
    }
  ) 
  
  let repositories

  if (!loading && !error)
    repositories = data.repositories
  
  return { repositories, loading, error, refetch};
};

export default useRepositories;