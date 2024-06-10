import Text from "./Text";
import { TextInput, View, Pressable, BackHandler } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from 'yup';
import useSignIn from "../hooks/useSignIn";

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
  password: ''
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
})

const SignIn = () => {

  const [signIn] = useSignIn()

  const onSubmit = async (values) => {
    const { username, password } = values


    try {
      const { data } = await signIn({ username, password })
      console.log(data)
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
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;