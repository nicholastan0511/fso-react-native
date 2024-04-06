import { View, StyleSheet, Image, Pressable } from 'react-native'
import Text from './Text'
import theme from '../theme'

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
    justifyContent: 'space-around'
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
    color: 'white'
  },
  rating: {
    alignItems: 'center'
  }
})

const RepoItem = ({ item }) => {
  console.log(item)
  return (
    <View style={styles.container}>
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
          <Text title>{item.stargazersCount}</Text>
          <Text description>Stars</Text>
        </View>
        <View style={styles.rating}>
          <Text title>{item.forksCount}</Text>
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
    </View>
  )
}

export default RepoItem;