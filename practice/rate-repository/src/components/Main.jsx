import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.backgrounds.body
  },
  separator: {
    height: 30
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.separator}></View>
      <RepositoryList />
    </View>
  );
};

export default Main;