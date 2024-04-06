import Text from "./Text";
import { TextInput, View, Pressable, BackHandler } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";

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
    borderRadius: 10,
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

const SignIn = () => {
  
  const onSubmit = (values) => {
    console.log(values)
  }
  const formik = useFormik({
    initialValues,
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
      <TextInput 
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={styles.inputStyle}
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;