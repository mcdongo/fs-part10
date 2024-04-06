import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  flexContainerHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 20
  },
  flexContainerFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  flexItemA: {
    flexGrow: 0,
    alignItems: 'center'
  },
  flexItemB: {
    flexGrow: 0,
    alignItems: 'flex-start',
    paddingLeft: 10,
    maxWidth: 300,
  },
  flexContainerVertical: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    paddingLeft: 5,
    paddingRight: 5,
    alignSelf: 'flex-start'
  }
})

const RepositoryItem = ({ item }) => {

  const stars = item.stargazersCount > 1000 ? `${(item.stargazersCount / 1000).toFixed(1)}k` : item.stargazersCount;
  const forks = item.forksCount > 1000 ? `${(item.forksCount / 1000).toFixed(1)}k` : item.forksCount;
  const reviews = item.reviewCount > 1000 ? `${(item.reviewCount / 1000).toFixed(1)}k` : item.reviewCount;

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.flexContainerHorizontal}>
        <View style={styles.flexItemB}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.ownerAvatarUrl
            }}
          />
        </View>

        <View style={styles.flexContainerVertical}>
          <View style={styles.flexItemB}><Text fontWeight={'bold'}>{item.fullName}</Text></View>
          <View style={styles.flexItemB}><Text>{item.description}</Text></View>
          <View style={styles.flexItemB}>
            <View style={styles.languageContainer}><Text color={'header'}>{item.language}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.flexContainerFooter}>
        <View style={styles.flexContainerVertical}>
          <View style={styles.flexItemA}><Text fontWeight={'bold'}>{stars}</Text></View>
          <View style={styles.flexItemA}><Text>stars</Text></View>
        </View>

        <View style={styles.flexContainerVertical}>
          <View style={styles.flexItemA}><Text fontWeight={'bold'}>{forks}</Text></View>
          <View style={styles.flexItemA}><Text>forks</Text></View>
        </View>

        <View style={styles.flexContainerVertical}>
          <View style={styles.flexItemA}><Text fontWeight={'bold'}>{reviews}</Text></View>
          <View style={styles.flexItemA}><Text>reviews</Text></View>
        </View>

        <View style={styles.flexContainerVertical}>
          <View style={styles.flexItemA}><Text fontWeight={'bold'}>{item.ratingAverage}</Text></View>
          <View style={styles.flexItemA}><Text>rating</Text></View>
        </View>

      </View>
    </View>
  );
};

export default RepositoryItem