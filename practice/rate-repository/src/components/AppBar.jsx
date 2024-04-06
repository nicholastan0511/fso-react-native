import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles= StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgrounds.appBar,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
})

const AppBar = () => {
  console.log('app bar rendered')
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab tab='Repositories' link='/' />
        <AppBarTab tab='Sign In' link='/signin' />
      </ScrollView>
    </View>
  )
}

export default AppBar;