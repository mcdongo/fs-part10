import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textInputBox: {
    width: 250,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4
  },
  flexItem: {
    flexGrow: 0,
    paddingTop: 10
  },
  signInButton: {
    width: 250,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    color: 'white',
    backgroundColor: theme.colors.primary
  }
});

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
})

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });



  return (
    <View>
      <View style={styles.flexItem}>
        <TextInput
          placeholder='username'
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          style={styles.textInputBox}
        />
        {formik.touched.username && formik.errors.username && (
          <Text color={'error'}>{formik.errors.username}</Text>
        )}
      </View>

      <View style={styles.flexItem}>
        <TextInput
          placeholder='password'
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          secureTextEntry
          style={styles.textInputBox}
        />
        {formik.touched.password && formik.errors.password && (
          <Text color={'error'}>{formik.errors.password}</Text>
        )}
      </View>

      <View style={styles.flexItem}>
        <Pressable onPress={formik.handleSubmit} style={styles.signInButton}>
          <Text fontWeight={'bold'} color={'header'}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    console.log(values)
  };
  return <View style={styles.container}><SignInForm onSubmit={onSubmit} /></View>;
};

export default SignIn;