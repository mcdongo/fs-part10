import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryInfo from './RepositoryItem';
import useRepositories from '../hooks/useRepositories'; 
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.fillerColor
  },
  sortPicker: {
    backgroundColor: theme.colors.fillerColor,
    color: theme.colors.textPrimary,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortSelection = ({currentSort, setCurrentSort}) => {
  return (
    <>
    <Picker
      selectedValue={currentSort}
      style={styles.sortPicker}
      onValueChange={(itemValue) =>
        setCurrentSort(itemValue)
    }>
      <Picker.Item label='Latest repositories' value={'time'} />
      <Picker.Item label='Highest rated repositories' value={'highest'} />
      <Picker.Item label='Lowest rated repositories' value={'lowest'} />
    </Picker>
    </>
  )
}

export const RepositoryListContainer = ({ repositories, currentSort, setCurrentSort }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <SortSelection currentSort={currentSort} setCurrentSort={setCurrentSort} />}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryInfo key={item.id} item={item} singleEntry={false} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [currentSort, setCurrentSort] = useState('time');
  console.log(currentSort);
  const orderBy = currentSort === 'time'
    ? 'CREATED_AT'
    : 'RATING_AVERAGE';

  let orderDirection = 'DESC';

  if (orderBy === 'RATING_AVERAGE') {
    orderDirection = currentSort === 'highest'
      ? 'DESC'
      : 'ASC';
  }

  const { repositories } = useRepositories(orderBy, orderDirection);

  return <RepositoryListContainer repositories={repositories} currentSort={currentSort} setCurrentSort={setCurrentSort}/>;
};

export default RepositoryList;