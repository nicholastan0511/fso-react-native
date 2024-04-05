import { Text, View } from 'react-native'

const RepoItem = ({ item }) => {
  console.log(item)
  return (
    <View>
      <Text>Fullname: { item.fullName }</Text>
      <Text>Descrpiption: { item.description }</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  )
}

export default RepoItem;