import { Pressable } from 'react-native';
import Text from './Text';

const AppBarTab = ( {name} ) => {
  return (
    <Pressable
      onPress={() => console.log(`pressed ${name}`)}
    >
      <Text color={'header'} fontWeight={'bold'}>{name}</Text>
    </Pressable>
  );
};

export default AppBarTab;