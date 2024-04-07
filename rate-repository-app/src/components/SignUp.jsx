import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

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
  errorBorder: {
    borderColor: theme.colors.errorText,
    borderWidth: 1
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
  password: '',
  passwordconfirm: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Min length 5 characters')
    .max(30, 'Max length 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Min length 5 characters')
    .max(30, 'Max length 30 characters')
    .required('Password is required'),
  passwordconfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password confirm must match.')
    .required('Password confimation required'),
})

export const SignUpForm = ({ onSubmit }) => {
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
          style={[styles.textInputBox, formik.touched.username && formik.errors.username && styles.errorBorder]}
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
          style={[styles.textInputBox, formik.touched.password && formik.errors.password && styles.errorBorder]}
        />
        {formik.touched.password && formik.errors.password && (
          <Text color={'error'}>{formik.errors.password}</Text>
        )}
      </View>

      <View style={styles.flexItem}>
        <TextInput
          placeholder='password confirmation'
          value={formik.values.passwordconfirm}
          onChangeText={formik.handleChange('passwordconfirm')}
          secureTextEntry
          style={[styles.textInputBox, formik.touched.passwordconfirm && formik.errors.passwordconfirm && styles.errorBorder]}
        />
        {formik.touched.passwordconfirm && formik.errors.passwordconfirm && (
          <Text color={'error'}>{formik.errors.passwordconfirm}</Text>
        )}
      </View>

      <View style={styles.flexItem}>
        <Pressable onPress={formik.handleSubmit} style={styles.signInButton}>
          <Text fontWeight={'bold'} color={'header'}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { signUpData } = await signUp({ username, password });
      console.log(signUpData);
      const { signInData } = await signIn({ username, password });
      console.log(signInData)
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return <View style={styles.container}><SignUpForm onSubmit={onSubmit} /></View>;
};

export default SignUp;