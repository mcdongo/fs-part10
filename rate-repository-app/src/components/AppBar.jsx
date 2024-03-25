import { View, StyleSheet, ScrollView } from 'react-native';
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
    paddingLeft: 10,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.flexItem}>
        <View style={styles.flexItem}>
          <AppBarTab name={'Repositories'} link={'/'}/>
        </View>
        <View style={styles.flexItem}>
          <AppBarTab name={'Sign in'} link={'/login'} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;