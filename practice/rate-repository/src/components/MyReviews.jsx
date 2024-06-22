import ReviewItem from "./ReviewItem"
import Text from "./Text"
import { FlatList } from "react-native"
import { ItemSeparator } from "./RepositoryList"
import { useEffect } from "react"

const MyReviews = ({ handleRefetch, loading, me }) => {
  
  const refetch = async () => {
    await handleRefetch(true)
  }

  useEffect(() => {
    refetch()
  }, [])


  if (loading) return <Text>loading...</Text>


  const reviews = me ? me.reviews ? me.reviews.edges.map(edge => edge.node) : [] : []

  return (
    <FlatList 
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} myReview='true' refetch={handleRefetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={<ItemSeparator />}
    />
  )
}

export default MyReviews