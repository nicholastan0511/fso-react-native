import Text from "./Text";
import { TextInput, View, Pressable } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from 'yup';
import useCreateUser from "../hooks/useCreateUser";
import { useNavigate } from "react-router-native";


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

const initialValues= {
  username: '',
  password: '',
  passwordConfirm: ''
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required')
})

const SignUp = () => {
  const navigate = useNavigate()
  const [signUp, errorMessage] = useCreateUser()

  return <SignUpContainer signUp={signUp} navigate={navigate} errorMessage={errorMessage}/>
};

export const SignUpContainer = ({ signUp, navigate, errorMessage }) => {
  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      await signUp({ username, password })
      navigate('/signin')
    } catch (e) {
      console.log(e)
    }

  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <View style={styles.container}>
      {errorMessage ? <Text error>{errorMessage}</Text> : null}
      <TextInput 
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={styles.inputStyle}
      />
      {formik.touched.username && formik.errors.username && (
        <Text error>{formik.errors.username}</Text>
      )}
      <TextInput 
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={styles.inputStyle}
      />
      {formik.touched.password && formik.errors.password && (
        <Text error>{formik.errors.password}</Text>
      )}
      <TextInput 
        placeholder="Confirm Password"
        secureTextEntry
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
        style={styles.inputStyle}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text error>Please confirm password!</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

export default SignUp;