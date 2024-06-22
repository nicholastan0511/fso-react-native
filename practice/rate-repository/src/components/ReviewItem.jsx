import { format } from 'date-fns'
import { View, Pressable, StyleSheet } from 'react-native'
import Text from './Text'
import { styles } from './RepositoryItem'
import { useNavigate } from 'react-router-native'
import useDeleteReview from '../hooks/useDeleteReview'
import theme from '../theme'

const reviewStyles = StyleSheet.create({
  viewButton: {
    backgroundColor: 'lightblue',
    padding: 15,
    width: 200,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5
  },
  viewText: {
    textAlign: 'center'
  },
  deleteReviewButton: {
    backgroundColor: 'red',
    padding: 15,
    width: 200,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5
  },
  container: {
    display: 'flex',
    backgroundColor: theme.backgrounds.repoItem,
    padding: 20,
    borderRadius: 10,
    gap: 30,
    minHeight: 250,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50
  }
})

const ReviewItem = ({ review, myReview, refetch }) => {
    const navigate = useNavigate()
    const { deleteReview, result, errorMessage } = useDeleteReview()

    const formattedDate = format(review.createdAt, 'dd/MM/yyyy')

    const handleViewRepo = (id) => {
      navigate(`/repos/${id}`)
    }

    const handleDeleteReview = async (id) => {
      console.log(id, typeof id)
      try {
        await deleteReview(id, refetch)
      } catch (e) {
        console.log(e.message)
      }
    }
  
    return (
      <View style={reviewStyles.container}>
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
        {myReview ?
          <View style={reviewStyles.buttonGroup}>
            <Pressable onPress={() => handleViewRepo(review.repositoryId)} style={reviewStyles.viewButton}>
              <Text>View Repository</Text>
            </Pressable>
            <Pressable onPress={() => handleDeleteReview(review.id)} style={reviewStyles.deleteReviewButton}>
              <Text>Delete Review</Text>
            </Pressable>
          </View>
          :
          null
        }
      </View>
    )
}

export default ReviewItem