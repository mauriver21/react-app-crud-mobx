import { useProductModel } from '@/models/useProductModel';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

export const ProductsList: React.FC = observer(() => {
  const productModel = useProductModel();
  const products = productModel.selectProducts();

  useEffect(() => {
    productModel.list();
  }, []);

  return (
    <code>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </code>
  );
});
