import { View, Image, StyleSheet, Pressable, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';
import { useSingleRepository } from '../hooks/useRepositories';

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
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5
  },
  flexContainerFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 10
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
  },
  openButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    padding: 5,
    alignItems: 'center',
    width: '90%'
  },
  scoreCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.fillerColor
  },
})

const RepositoryInfo = ({ item, singleEntry }) => {

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
      {singleEntry &&
      <Pressable onPress={() => Linking.openURL(item.url)}>
          <View style={styles.flexContainerFooter}>
            <View style={styles.openButton} >
              <Text fontWeight={'bold'} color={'header'}>Open in Github</Text>
            </View>
          </View>
      </Pressable>
      }
    </View>
  );
};

export default RepositoryInfo

const ReviewItem = ({ review }) => {
  const createdAt = new Date(review.createdAt);
  const newDateString = `${createdAt.getDate()}.${createdAt.getMonth() + 1}.${createdAt.getFullYear()}`;
  return (
    <View style={styles.flexContainerHorizontal}>
      <View style={styles.flexItemB}>
        <View style={styles.scoreCircle}>
          <Text fontWeight={'bold'} color={'primary'}>{review.rating}</Text>
        </View>
      </View>
      <View style={styles.flexContainerVertical}>
        <View style={styles.flexItemB}>
          <Text fontWeight={'bold'}>{review.user.username}</Text>
        </View>
        <View style={styles.flexItemB}>
          <Text>{newDateString}</Text>
        </View>
        <View style={styles.flexItemB}>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />;

export const SingleRepositoryItem = () => {
  const { id } = useParams();
  const { repository, loading } = useSingleRepository(id);

  if (loading) {
    return;
  }
  
  const reviewNodes = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo item={repository} />}
    />
  )
  
}