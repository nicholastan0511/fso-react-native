import { FlatList, View, StyleSheet } from 'react-native';
import RepoItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  container: {
    alignItems: 'center'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({ me }) => {
  const navigate = useNavigate()
  const { repositories } = useRepositories();

  if (!me) navigate('/signin')
    
  return <RepositoryListContainer repositories={repositories} />
};

export const RepositoryListContainer = ({ repositories }) => {
  //Get the nodes from the edges array
  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  return (
    <View style={styles.container}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={RepoItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default RepositoryList; 