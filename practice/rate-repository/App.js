import Main from './src/components/Main';
import { StatusBar } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Constants from 'expo-constants'
import AuthStorage from './src/utils/authStorage';
import RefetchReviewContext from './src/contexts/RefetchReviewContext';
import AuthStorageContext from './src/contexts/AuthStorageContext';

import createApolloClient from './src/utils/apolloClient';

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage);

const App = () => {
  console.log(Constants.expoConfig)

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main/>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style='auto' />
    </>
  )
};

export default App;