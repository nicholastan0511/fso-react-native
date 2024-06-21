import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

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


const AppBar = ({ me, loading }) => {

  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()
  const navigate = useNavigate()

  const signOut = async (e) => {
    e.preventDefault()
    console.log('im called')
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
    navigate('/signin')
  }
  
  if (loading) return <p>loading...</p>

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        {me ? (
            <>
              <AppBarTab tab='Repositories' link='/' />
              <AppBarTab tab='Create a Review' link='/createreview' />
              <AppBarTab tab='My Reviews' link='/myreviews' />
              <AppBarTab tab='Sign Out' onClick={signOut} link='/signin' />
            </>
          ) 
        : (
            <>
              <AppBarTab tab='Sign Up' link='/signup'/>
              <AppBarTab tab='Sign In' link='/signin' />
            </>
          )
        }
      </ScrollView>
    </View>
  )
}

export default AppBar;