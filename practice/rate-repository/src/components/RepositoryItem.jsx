import { View, StyleSheet, Image, Pressable } from 'react-native'
import Text from './Text'
import theme from '../theme'
import { useParams, Link } from 'react-router-native'
import useOneRepo from '../hooks/useOneRepo'
import * as Linking from 'expo-linking'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: theme.backgrounds.repoItem,
    padding: 20,
    borderRadius: 10,
    gap: 30
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20
  },
  descriptionContainer: {
    justifyContent: 'space-between',
    height: 80
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 7
  },
  languageButton: {
    height: 25,
    width: 80,
    borderRadius: 7,
    backgroundColor: '#2f8dff',
    textAlign: 'center',
    color: 'white',
  },
  button: {
    padding: 10
  },
  rating: {
    alignItems: 'center',
    gap: 7
  },
  github: {
    width: 500,
    textAlign: 'center',
    backgroundColor: '#2f8dff',
    color: 'white',
    borderRadius: 7,
    padding: 10,
    alignSelf: 'center'
  }
})

const formatNum = (num) => {
  if (num >= 1000 && num / 1000  > 1) {
    const dividedNum = Math.round((num / 1000) * 10) / 10 .toString()
    return dividedNum + 'k'
  }

  return num
}

const RepoItem = ({ item }) => {
  return (
    <RepoItemContainer item={item} />
  )
}
const RepoItemContainer = ({ item, byId }) => {
  const handleOpenUrl = () => {
    Linking.openURL(item.url)
      .catch((err) => console.error('failed to open url: ', err))
  }

  return (
    <Link to={`/repos/${item.id}`}>
        <View style={styles.container} testID='repositoryItem'>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={item.ownerAvatarUrl} />
            <View style={styles.descriptionContainer}>
              <Text title>{item.fullName}</Text>
              <Text description>{ item.description }</Text>
              <Pressable>
                <Text style={styles.languageButton}>{item.language}</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Text title>{formatNum(item.stargazersCount)}</Text>
              <Text description>Stars</Text>
            </View>
            <View style={styles.rating}>
              <Text title>{formatNum(item.forksCount)}</Text>
              <Text description>Forks</Text>
            </View>
            
            <View style={styles.rating}>
              <Text title>{item.reviewCount}</Text>
              <Text description>Reviews</Text>
            </View>
            
            <View style={styles.rating}>
              <Text title>{item.ratingAverage}</Text>
              <Text description>Rating</Text>
            </View>
          </View>
          {byId 
            ? (
              <Pressable onPress={handleOpenUrl}>
                <Text style={styles.github}>Open on GitHub</Text>
              </Pressable>
            )
            : <></>
          }
        </View>
      </Link>
  )
  }

export const RepoItemById = () => {
  const { id } = useParams()
  console.log(id)
  const { repo, loading, error} = useOneRepo(id)


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!repo) {
    return <p>Not found...</p>;
  }

  return (
    <RepoItemContainer item={repo} byId='true' />
  )

}

export default RepoItem;