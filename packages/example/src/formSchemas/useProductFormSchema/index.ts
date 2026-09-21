import * as yup from 'yup';

export const useProductFormSchema = () => {
  return yup.object({
    name: yup.string().required('Name is required'),
    price: yup
      .number()
      .typeError('Price must be a number')
      .positive('Price must be greater than 0')
      .required('Price is required'),
  });
};
