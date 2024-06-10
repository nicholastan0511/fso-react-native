import { Pressable } from "react-native"
import Text from "./Text"
import { Link } from "react-router-native";

const AppBarTab = ({ tab, link, onClick }) => {
  console.log(tab)
  return (
    <Pressable>
      <Link to={link} onPress={onClick}>
        <Text appBar >{tab}</Text>
      </Link>
    </Pressable>
  )
};

export default AppBarTab