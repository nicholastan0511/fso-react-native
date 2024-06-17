import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import ReviewForm from './CreateReview';
import theme from '../theme';
import { Route, Routes, Navigate, Link, useLocation } from 'react-router-native'
import SignIn from './SignIn';
import { RepoItemById } from './RepositoryItem';
import useMe from '../hooks/useMe';
import { useEffect } from 'react';

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
  const { me, loading } = useMe()

  const location = useLocation();

  useEffect(() => {
    console.log('Route changed to:', location.pathname);
  }, [location]);

  if (loading) return <p>loading...</p>

  return (
    <View style={styles.container}>
      <AppBar me={me} loading={loading} />
      <View style={styles.separator}></View>
      <Routes>
        <Route path='/' element={<RepositoryList me={me}/>} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='*' element={<Navigate to='/'  />} />
        <Route path='/repo' element={<RepositoryList />} />
        <Route path='/repos/:id' element={<RepoItemById />} />
        <Route path='/createreview' element={<ReviewForm />} />
      </Routes>
    </View>
  );
};

export default Main;