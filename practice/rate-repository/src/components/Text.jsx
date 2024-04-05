import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  defaultText: {
    color: theme.colors.textPrimary,
    fontSize: theme.colors.body
  },
  appBar: {
    fontSize: theme.colors.appBar
  }
})

const Text = ({ appBar, style, ...props }) => {
  const textStyle = [
    styles.defaultText,
    appBar && styles.appBar,
    style
  ];

  return <NativeText style={textStyle} {...props} />;
}

export default Text;