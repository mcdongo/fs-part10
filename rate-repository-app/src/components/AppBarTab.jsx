import { Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const AppBarTab = ( {name, link} ) => {
  return (
    <Pressable
      onPress={() => console.log(`pressed ${name}`)}
    >
      <Link to={link}>
        <Text color={'header'} fontWeight={'bold'}>{name}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;