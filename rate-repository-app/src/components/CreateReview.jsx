import { TextInput, View, StyleSheet, Pressable } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import useCreateReview from '../hooks/useCreateReview';

import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';

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
  createButton: {
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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
}

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner is required.'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number('Rating must be a number')
    .integer('Rating must be an integer.')
    .min(1, 'Rating of 1 is minimum.')
    .max(100, 'Rating of 100 is maximum.')
    .required('Rating is required'),
  text: yup
    .string()
})

export const CreateReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <View>
      <View style={styles.flexItem}>
        <TextInput
          placeholder='Repository owner name'
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
          style={[styles.textInputBox, formik.touched.ownerName && formik.errors.ownerName && styles.errorBorder]}
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text color={'error'}>{formik.errors.ownerName}</Text>
        )}
      </View>

      <View style={styles.flexItem}>
        <TextInput
          placeholder='Repository name'
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
          style={[styles.textInputBox, formik.touched.repositoryName && formik.errors.repositoryName && styles.errorBorder]}
        />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text color={'error'}>{formik.errors.repositoryName}</Text>
        )}
      </View>

      <View style={styles.flexItem}>
        <TextInput
          placeholder='Rating between 0 and 100'
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
          style={[styles.textInputBox, formik.touched.rating && formik.errors.rating && styles.errorBorder]}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text color={'error'}>{formik.errors.rating}</Text>
        )}
      </View>

      <View style={styles.flexItem}>
        <TextInput
          multiline={true}
          placeholder='Review'
          value={formik.values.text}
          onChangeText={formik.handleChange('text')}
          style={[styles.textInputBox, formik.touched.text && formik.errors.text && styles.errorBorder]}
        />
        {formik.touched.text && formik.errors.text && (
          <Text color={'error'}>{formik.errors.rating}</Text>
        )}
      </View>

      <View style={styles.flexItem}>
        <Pressable onPress={formik.handleSubmit} style={styles.createButton}>
          <Text fontWeight={'bold'} color={'header'}>Create a review</Text>
        </Pressable>
      </View>
    </View>
  )
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { ownerName, rating, repositoryName, text } = values;

    try {
      const { data } = await createReview({ ownerName, rating, repositoryName, text})
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e)
    }

  };

  return <View style={styles.container}><CreateReviewForm onSubmit={onSubmit} /></View>;
}

export default CreateReview