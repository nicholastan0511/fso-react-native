import { View, StyleSheet, Image, Pressable, FlatList } from 'react-native'
import Text from './Text'
import theme from '../theme'
import { useParams, Link } from 'react-router-native'
import useOneRepo from '../hooks/useOneRepo'
import * as Linking from 'expo-linking'
import { ItemSeparator } from './RepositoryList'
import { format } from 'date-fns'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: theme.backgrounds.repoItem,
    padding: 20,
    borderRadius: 10,
    gap: 30,
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
  },
  listHeadRepo: {
    marginBottom: 10
  },
  containerItem: {
    flexDirection: 'row',
    backgroundColor: theme.backgrounds.repoItem,
    padding: 20,
    borderRadius: 10,
    gap: 30,
    minHeight: 250,
    justifyContent: 'space-between',
  },
  containerDescription: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  containerRatingItem: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    borderStyle: 'solid',
    borderColor: 'blue',
    borderWidth: 4,
    textAlign: 'center',
    justifyContent: 'center', // Align text vertically in the center
    alignItems: 'center', // Align text horizontally in the center
  },
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
    <Link to={`/repos/${item.id}`} style={styles.listHeadRepo}>
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

const ReviewItem = ({ review }) => {
  const formattedDate = format(review.createdAt, 'dd/MM/yyyy')

  return (
    <View style={styles.containerItem}>
      <View style={styles.containerRatingItem}> 
        <Text >
          {review.rating}
        </Text>
      </View>
      <View style={styles.containerDescription}>
        <Text>{review.user.username}</Text>
        <Text>{formattedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}


export const RepoItemById = () => {
  const { id } = useParams()
  const { repo, loading, error} = useOneRepo(id)

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!repo) {
    return <Text>Not found...</Text>;
  }

  const reviews = repo.reviews.edges.map(edge => edge.node)
  console.log(reviews)
  return (
    <FlatList 
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepoItemContainer item={repo} byId='true' />}
      ItemSeparatorComponent={<ItemSeparator />}
    />
  )
}

export default RepoItem;