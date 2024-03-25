import Text from './Text';

const AppBarTab = ( {name} ) => {
  return (
      <Text color={'header'} fontWeight={'bold'}>{name}</Text>
  );
};

export default AppBarTab;