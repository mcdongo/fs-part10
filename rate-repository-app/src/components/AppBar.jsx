import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundColor,
    flexDirection: 'row',
    display: 'flex',
    // ...
  },
  flexItem: {
    paddingBottom: 10,
    paddingLeft: 20,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.flexItem}>
        <AppBarTab name={'Repositories'} />
      </View>
    </View>
  );
};

export default AppBar;