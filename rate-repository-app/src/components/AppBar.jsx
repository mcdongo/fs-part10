import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import useVerifyAuthorization from '../hooks/useVerifyAuthorization';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import Text from './Text';

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
  const { user } = useVerifyAuthorization();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const logOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.flexItem}>
        <View style={styles.flexItem}>
          <AppBarTab name={'Repositories'} link={'/'} purpose={'link'}/>
        </View>
        <View style={styles.flexItem}>
          {!user &&
          <AppBarTab name={'Sign in'} link={'/login'} purpose={'link'} />
          }
          {user &&
          <Pressable
            onPress={logOut}
          >
            <Text color={'header'} fontWeight={'bold'}>Sign out</Text>
          </Pressable>
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;