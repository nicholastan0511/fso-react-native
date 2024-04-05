import Constants from 'expo-constants'
import { Text, StyleSheet, View } from 'react-native'
import RepositoryList from '../../../rate-repository/src/components/RepositoryList';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  }
});

const Main = () => {
  console.log('bruh')
  return (
    <View style={styles.container}>
      <Text>Rate Repository Application</Text>
      <RepositoryList />
    </View>
  );
};

export default Main;