import { useEffect } from "react"
import ReviewItem from "./ReviewItem"
import Text from "./Text"
import { FlatList } from "react-native"
import { ItemSeparator } from "./RepositoryList"

const MyReviews = ({ refetch, me, loading }) => {
  useEffect(() => {
    handleRefetch()
  }, [])

  const handleRefetch = async () => {
    await refetch({ includeReviews: true })
  }

  if (loading) return <Text>loading...</Text>

  const reviews = me ? me.reviews ? me.reviews.edges.map(edge => edge.node) : [] : []

  console.log(reviews)

  return (
    <FlatList 
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={<ItemSeparator />}
    />
  )
}

export default MyReviews