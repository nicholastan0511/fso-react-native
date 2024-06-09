import { Platform } from "react-native";

const theme = {
  backgrounds: {
    appBar: '#24292e',
    body: '#DCDCDC',
    repoItem: 'white'
  },
  colors: {
    textPrimary: 'black',
    textAppBar: 'white',
    textDesc: 'gray',
    error: '#d73a4a'
  },
  fontSizes: {
    appBar: 20,
    body: 15,
  },
  fontWeights: {
    title: 700,
    description: 400
  },
  fontFamily: Platform.select({
    android: 'Roboto',
    ios: 'Arial',
    default: 'System'
  })

}

export default theme;