import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  defaultText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body
  },
  appBar: {
    color: theme.colors.textAppBar,
    fontSize: theme.fontSizes.appBar
  },
  title: {
    fontWeight: theme.fontWeights.title
  },
  description: {
    fontWeight: theme.fontWeights.description
  }
})

const Text = ({ appBar, style, title, description, ...props }) => {
  const textStyle = [
    styles.defaultText,
    appBar && styles.appBar,
    title && styles.title,
    description && styles.description,
    style
  ];

  return <NativeText style={textStyle} {...props} />;
}

export default Text;