import { FlatList, View, StyleSheet } from 'react-native';
import Text from './Text';
import RepoItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker'
import { useState, useEffect } from 'react';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  container: {
    alignItems: 'center'
  }
});

export const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, refetch, loading } = useRepositories()
  return <RepositoryListContainer repositories={repositories} refetch={refetch} loading={loading} />
};

export const RepositoryListContainer = ({ repositories, refetch }) => {
  const [orderBy, setOrderBy] = useState('RATING_AVERAGE')
  const [orderDirection, setOrderDirection] = useState('DESC')

  useEffect(() => {
    handleRefetch(orderBy, orderDirection)
  }, [orderBy, orderDirection])

  const handleRefetch = async (orderBy, orderDirection) => {
    await refetch({
      orderBy,
      orderDirection
    })
  }

  //Get the nodes from the edges array
  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={orderBy}
        onValueChange={(itemValue, itemIndex) => setOrderBy(itemValue)}
      >
        <Picker.Item label="Rating Average" value="RATING_AVERAGE" />
        <Picker.Item label="Date of Creation" value="CREATED_AT" />
      </Picker>
      <Picker
        selectedValue={orderDirection}
        onValueChange={(itemValue, itemIndex) => setOrderDirection(itemValue)}
      >
        <Picker.Item label="Descending" value="DESC" />
        <Picker.Item label="Ascending" value="ASC" />
      </Picker>
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