import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryInfo from './RepositoryItem';
import useRepositories from '../hooks/useRepositories'; 
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.fillerColor
  },
  container: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.colors.fillerColor,

  },
  sortPicker: {
    backgroundColor: theme.colors.fillerColor,
  },
  textInputBox: {
    width: 250,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props
    return (
      <>
      <View style={styles.container}>
        <TextInput
          placeholder='search'
          value={props.searchWord}
          style={styles.textInputBox}
          onChangeText={(value) => props.setSearchWord(value)}
        />
      </View>
        <Picker
          selectedValue={props.currentSort}
          style={styles.sortPicker}
          onValueChange={(itemValue) =>
            props.setCurrentSort(itemValue)
        }>
          <Picker.Item label='Latest repositories' value={'time'} />
          <Picker.Item label='Highest rated repositories' value={'highest'} />
          <Picker.Item label='Lowest rated repositories' value={'lowest'} />
        </Picker>
      </>
    );
  }
  render() {
    const props = this.props
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <Pressable onPress={() => props.navigate(`/repository/${item.id}`)}>
            <RepositoryInfo key={item.id} item={item} singleEntry={false} />
          </Pressable>
        )}
      />
    );
  }
}

const RepositoryList = () => {
  const [currentSort, setCurrentSort] = useState('time');
  const [searchWord, setSearchWord] = useState('');
  const [searchWordValue] = useDebounce(searchWord, 500);
  const navigate = useNavigate();

  const orderBy = currentSort === 'time'
    ? 'CREATED_AT'
    : 'RATING_AVERAGE';

  let orderDirection = 'DESC';

  if (orderBy === 'RATING_AVERAGE') {
    orderDirection = currentSort === 'highest'
      ? 'DESC'
      : 'ASC';
  }

  const { repositories } = useRepositories(orderBy, orderDirection, searchWordValue);

  return <RepositoryListContainer
          repositories={repositories}
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          navigate={navigate}
        />;
};

export default RepositoryList;