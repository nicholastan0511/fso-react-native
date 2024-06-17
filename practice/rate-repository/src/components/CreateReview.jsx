import Text from "./Text";
import { TextInput, View, Pressable, BackHandler } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from 'yup';
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";

const styles =  {
    container: {
        backgroundColor: theme.backgrounds.repoItem,
        alignItems: 'center',
        borderRadius: 8,
        margin: 10,
        justifyContent: 'space-between',
        padding: 20,
        gap: 20
    },
    inputStyle: {
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1.5,
        padding: 10
    },
        button: {
        backgroundColor: '#0000ff', 
        width: 150,
        borderRadius: 10,
        padding: 10
    },
        buttonText: {
        color: 'white',
        textAlign: 'center'
    }
}

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
}

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .positive()
        .integer()
        .min(0, 'Rating must be at least 0')
        .max(100, 'Rating must be at most 100')
        .required('Rating is required'),
    text: yup
        .string()
        .required('Review is required')
})

const ReviewForm = () => {
  const [createReview, errorMessage] = useCreateReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values

    try {
      const { data } = await createReview({ ownerName, repositoryName, rating: Number(rating), text })
      const repoId = data.createReview.repositoryId
      navigate(`/repos/${repoId}`)
    } catch (e){
      console.log(e.message)
    }
  }


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <View style={styles.container}>
      {/* set error message when repo is not found etc. */}
      {errorMessage ? <Text error>{errorMessage}</Text> : null}
      <TextInput 
        placeholder="Owner Name"
        value={formik.values.username}
        onChangeText={formik.handleChange('ownerName')}
        style={styles.inputStyle}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text error>{formik.errors.ownerName}</Text>
      )}
      <TextInput 
        placeholder="Repository Name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        style={styles.inputStyle}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text error>{formik.errors.repositoryName}</Text>
      )}
      <TextInput 
        placeholder="Rating"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        style={styles.inputStyle}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text error>{formik.errors.rating}</Text>
      )}
      <TextInput 
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        style={styles.inputStyle}
      />
      {formik.touched.text && formik.errors.text && (
        <Text error>{formik.errors.text}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Create a Review</Text>
      </Pressable>
    </View>

  )

}

export default ReviewForm
