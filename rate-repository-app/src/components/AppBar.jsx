import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import useGetUser from '../hooks/useGetUser';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import Text from './Text';
import { useNavigate } from 'react-router-native';

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
  const { user } = useGetUser();
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const logOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.flexItem}>
        <View style={styles.flexItem}>
          <AppBarTab name={'Repositories'} link={'/'} />
        </View>
        {user &&
          <>
            <View style={styles.flexItem}>
              <AppBarTab name={'Create a review'} link={'/createreview'} />
            </View>

            <View style={styles.flexItem}>
              <AppBarTab name={'My reviews'} link={'/myreviews'} />
            </View>

            <View style={styles.flexItem}>
              <Pressable
              onPress={logOut}
              >
                <Text color={'header'} fontWeight={'bold'}>Sign out</Text>
              </Pressable>
            </View>
          </>
        }

        {!user &&
          <>
            <View style={styles.flexItem}>
              <AppBarTab name={'Sign in'} link={'/login'} />
            </View>

            <View style={styles.flexItem}>
              <AppBarTab name={'Sign up'} link={'/register'} />
            </View>
          </>        
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;