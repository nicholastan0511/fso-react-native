import { Pressable } from "react-native"
import Text from "./Text"

const AppBarTab = ({ tab }) => {
  console.log(tab)
  return (
    <Pressable>
      <Text appBar>{tab}</Text>
    </Pressable>
  )
};

export default AppBarTab