import { format } from 'date-fns'
import { View } from 'react-native'
import Text from './Text'
import { styles } from './RepositoryItem'

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

export default ReviewItem