import { useProductFormSchema } from '@/formSchemas/useProductFormSchema';
import type { ProductFormValues } from '@/interfaces/ProductFormValues';
import { useProductModel } from '@/models/useProductModel';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField } from '@/components/TextField';

export const ProductForm: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const productModel = useProductModel();
  const schema = useProductFormSchema();

  const product = id ? productModel.selectProduct(id) : undefined;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', price: 0 },
  });

  const onSubmit = async (values: ProductFormValues) => {
    if (isEditing && id) {
      await productModel.update({ ...values, id });
    } else {
      await productModel.create(values);
    }
    navigate('/');
  };

  useEffect(() => {
    if (id) productModel.read(id);
  }, [id]);

  useEffect(() => {
    if (product) reset({ name: product.name, price: product.price });
  }, [product]);

  return (
    <Paper sx={{ p: 3, maxWidth: 480, m: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {isEditing ? 'Edit Product' : 'New Product'}
      </Typography>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{ gap: 2 }}>
        <TextField control={control} name="name" label="Name" required />
        <TextField
          control={control}
          name="price"
          label="Price"
          type="number"
          required
          slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
        />
        <Stack
          sx={{ flexDirection: 'row', gap: 1, justifyContent: 'flex-end' }}
        >
          <Button variant="outlined" onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
});
