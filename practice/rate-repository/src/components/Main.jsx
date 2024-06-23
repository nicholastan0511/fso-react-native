import { StyleSheet, View, ScrollView } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import ReviewForm from './CreateReview';
import theme from '../theme';
import { Route, Routes, Navigate, useLocation } from 'react-router-native'
import SignIn from './SignIn';
import { RepoItemById } from './RepositoryItem';
import useMe from '../hooks/useMe';
import { useEffect } from 'react';
import SignUp from './SignUp';
import { useState } from 'react';
import Text from './Text';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.backgrounds.body,
  },
  separator: {
    height: 30
  }
});

const Main = () => {
  const { me, loading, handleRefetch, errorMessage } = useMe(false)
  const location = useLocation();

  console.log(typeof handleRefetch)

  useEffect(() => {
    console.log('Route changed to:', location.pathname);
  }, [location]);

  if (loading) return <Text>loading...</Text>

  // console.log(user)

  return (
    <View style={styles.container}>
      <AppBar me={me} loading={loading} />
      <View style={styles.separator}></View>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {/* <ScrollView> */}
        <Routes>
          <Route path='/' element={ me ? <RepositoryList /> : <Navigate to='/signin' />} />
          <Route path='/signin' element={!me ? <SignIn /> : <Navigate to='/' />} />
          <Route path='*' element={<Navigate to='/'  />} />
          <Route path='/repo' element={<RepositoryList />} />
          <Route path='/repos/:id' element={<RepoItemById />} />
          <Route path='/createreview' element={<ReviewForm handleRefetch={handleRefetch} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/myreviews' element={<MyReviews handleRefetch={handleRefetch} me={me} loading={loading} location={location} />} />
        </Routes>
      {/* </ScrollView> */}
    </View>
  );
};

export default Main;