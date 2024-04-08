import { FlatList, StyleSheet, View } from "react-native";
import useGetUser from "../hooks/useGetUser";
import { ReviewItem } from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.fillerColor
  }
})

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { user, loading } = useGetUser(true);
  const reviewNodes = user
    ? user.reviews.edges.map(edge => edge.node)
    : {}
  
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} userReviews={true} />}
      keyExtractor={({ id }) => id}
    />
  );
}

export default MyReviews;