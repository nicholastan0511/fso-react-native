import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles= StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgrounds.appBar,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

const AppBar = () => {
  console.log('app bar rendered')
  return (
    <View style={styles.container}>
      <AppBarTab tab='Repositories'/>
      <AppBarTab tab='' />
      <AppBarTab tab=''/>
    </View>
  )
}

export default AppBar;